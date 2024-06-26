---
title: "Lambda Connect RDS"
description: "我们的目的是把 RDS 和 Lambda 放在同一个VPC 下，并且要支持 Lambda 访问 RDS，Lambda 可以访问 SecretManager，Lambda 可以访问 DynamoDB" 
pubDate: "2024-05-21 17:47:00"
category: "tool"
banner: "/images/posts/lambda-rds/banner-1.jpg"
ogImage: "/images/posts/lambda-rds/banner-1.jpg"
tags: ["AWS", "Lambda", "RDS"]
---


这份文章解释了如何通过 Lambda 连接 AWS RDS 数据库以及 SecretManager 和 DynamoDB。

## Background

我们计划为项目引入关系型数据库支持，进过调研后我们选择了 AWS 的 PostgreSQL。而 PostgreSQL 数据库实例是运行在一个私有网络(VPC)内的，只有在同一个私有网络中的服务才能相互连接。

而在默认情况下，部署到 AWS 的 Lambda 运行在自己的另一套私有网络内，Lambda 的这个私有网络我们没法控制也不能自定义，就没法实现 Lambda 和 RDS 的互通。

现在我们的目的是把它们都放在同一个VPC 下，并且要支持：

1. Lambda 访问 RDS
2. Lambda 可以访问 SecretManager
3. Lambda 可以访问 DynamoDB

## VPC

所有云厂商都提供了 VPC 的配置，这属于网络的基石部分。默认情况下，AWS 会自动为我们创建一条的 VPC，不同的 VPC 默认情况下不能互通网络；请不要使用默认的 VPC 来部署你的应用，这可能因为一些缺失的配置导致你后面不得不花费更多的时间来 debug。

## Create VPC

可以按照 AWS 控制台的引导快速的创建一条 VPC，不过有几个点还是需要注意的：

1. 我们的 VPC 需要访问外网(SecretManager & DynamoDB)
2. 我们的 VPC 网络下会包含各种云资源(RDS)及 Lambda

所以我们应该至少在这个 VPC 下创建两个子网：

1. 所有的云资源如数据库、EC2 等放到子网 1
2. Lambda 运行在子网 2 下
3. 子网2 需要能访问外网，因为 SecretManager 和 DynamoDB 的服务是通过 Internet 公开访问的

这里涉及到了几个新的概念：VPC、子网、路由表。

### 子网

一个 VPC 可以包含多个子网，可以理解为 VPC 管理了某一个网络下的所有服务资源，而子网管理了某一个网段下的所有资源。

举个例子，我们在创建 VPC 时会指定 IPV4 CIDR Block 如 `192.168.0.0/16` 这代表这个 VPC 下的所有服务资源它们的 IP 最后都会是 `192.168.x.x`。

而子网则是更加具体的管理了**某一个网段下**的资源，如子网 1 的 IPv4 CIDR 为 `192.168.0.0/20` 它代表部署在这个子网下的所有服务，他们的 IP 范围应该为 `192.168.0.0 → 192.168.15.255` 。

因为这个特性所以子网能更加具体的控制某一个网段下的流量访问规则。

### 路由表

在创建子网时默认会创建这个子网相应的路由表，路由表定义了在这个子网中流量的流出流入规则。举个例子，下面的路由表里包含了两条默认的规则：

```
0.0.0.0/0               igw-123456789
192.168.0.0/16          local
```

它代表部署在这个子网中的服务，访问目标地址时的流量流出规则。假设我们将一个 EC2 实例部署到了这个子网：

1. 当在 EC2 中 Ping `192.168.x.x` 时，EC2 会将请求转发到所在子网的路由表，路由表会匹配上面的第二条规则，将流量转发到 Local，Local 会在整个 VPC 范围下广播，最终实现局域网内的通信。
2. 当在 EC2 中访问如 GitHub 等公网服务时，由于 GitHub 的 IP 地址只满足上述的第一条规则，所以在 EC2 中访问 GitHub 会将流量转发到 `igw` 网关。 
    
这里的 `igw-123456789` 是一个网关，它的全名叫 `Internet Gateway` 。

> 如果你的服务只需要在局域网中通信，即不需要访问外网，也不需要外网访问它们；你可以删除上面的 0.0.0.0 这条规则。

### Internet Gateway

VPC 下的服务默认情况是不能直接访问公共网络的，如果要访问公共网络，我们需要创建一个 Internet Gateway。Internet Gateway 允许与 Internet 之间的双向通信。换句话说，它将来自 VPC 的数据包通过 IGW 转发到 Internet，并将来自 Internet 的请求路由回 VPC，如 WEB 服务器。

假设我们的网络拓扑图如下，因为有了 IGW 的加持，理想情况下 Lambda 就可以访问外网 + 连接 RDS 数据库了：

```
VPC
  - sunnet1(lambda) -> route table1  -> 0.0.0.0/0       -> igw
                           ^         -> 192.168.0.0/16  -> local
                           |
  - subnet2(rds)    -------/
```

1. Lambda 被部署到了 subnet1，它访问 RDS 时，流量会经过 Route Table 1 然后通过 Local 最后转发到部署在 subnet2 中的 RDS 上，这确实是可行的 ✅。

```
Lambda Connect RDS -> Route Table1 -> 192.168.0.0/16 ---> Local
                                                            |
                                                            |
                                    RDS <- subnet2(rds) <---/
```

2. Lambda 访问外网时流量会经过 Route Table1 然后转发到 IGW 网关最后由 IGW 转发到外部服务中去。

```
Lambda Connect GitHub -> Route Table1 -> 0.0.0.0/0 ---> IGW -> Internet
```

**然而这实际上是行不通的**，要想通过 IGW 访问外网，部署到该子网的服务**必须有一个公网 IP**。如 EC2 实例要想通过 IGW 访问外网，那该 EC2 实例必须得有一个公网 IP。

默认我们部署在 VPC 环境下的 Lambda 并没有一个公网 IP，所以按照上述方式，Lambda 并不能直接访问外部网络。我们还需要引入一个单独的配置—— NAT。

### NAT

NAT，全称为 Network Address Translation，即网络地址转换。它的主要作用是帮助局域网（LAN）上的私有地址与 Internet 或其他网络上的公有地址进行转换，使得私有地址可以通过 NAT 直接访问外部网络。

NAT 与 IGW 的区别：

- NAT 是单向的，流量只能从 NAT → 外部网络，外部网络无法访问 NAT 里面的资源。所以如果一些服务只需要访问外网但不允许外网访问内部网络，就可以使用 NAT。
- IGW 是双工的，可以从 IGW → 外部网络，也可以从外部网络到 → NAT。比如 WEB 服务器，即需要服务器能返回 Response 给用户，也需要用户能直接请求服务器上的资源。

有了 NAT 后，我们的网络拓扑图如下。

```
VPC
  - sunnet1(lambda) -> route table1  -> 0.0.0.0/0       -> nat
                                     -> 192.168.0.0/16  -> local
                           
  - subnet2(rds)    -> route table2  -> 0.0.0.0/0       -> igw
                                     -> 192.168.0.0/16  -> local
```

1. Lambda 被部署在 subnet1 子网，当它在 Connect RDS 时，会通过上面的 `route table1 -> 192.168.0.0/16 -> local -> subnet2 -> RDS` 访问到 RDS 服务。
2. Lambda 访问外网时，会通过 `route table1 -> 0.0.0.0/0 -> nat` 然后经过 NAT 转发出去。

为了使每个子网的职责更加分明，我们重新设计了它们的网络结构：

```
VPC
  - subnet1(lambda) -> route table1  -> 0.0.0.0/0       -> nat
                           ^         -> 192.168.0.0/16  -> local
                           |
  - subnet2(rds)    -------/
    
                                     
  - subnet3(igw)    -> route table2  -> 0.0.0.0/0       -> igw
                                     -> 192.168.0.0/16  -> local
```

这里单独创建了一个 IGW 子网(`subnet3(igw)`)，它将所有的外部流量转发到 IGW；而其他所有的子网都进过 route table 1 将外部流量转发到 NAT。

举个例子，在上面的网络结构中，如果 Lambda 想要连接 GitHub，那他的流量流向为：

```
Lambda Connect GitHub -> Route Table1 -> 0.0.0.0/0    --->    NAT
                                                               |
                                                               |
GitHub <- igw <- 0.0.0.0/0 <- Route Table2 <- subnet3(igw) <---/
```

有了上述的背景知识，我们再来看如何在 AWS 中创建一个 VPC。

### Create VPC On AWS

1. 前往 AWS VPC 控制台点击 [Create VPC](https://us-east-1.console.aws.amazon.com/vpcconsole/home?region=us-east-1#CreateVpc:createMode=vpcWithResources)
2. 选择 VPC and More
3. 指定 IPv4 CIDR，可以用默认的 10.0.0.0/16
4. 设置 Number of Availability Zones，为了高可用&简单这里我们设置两个可用区
5. 设置 Number of public subnets，这里设置为 2 个
    1. 这里你可能有疑问什么是 Public Subnet，其实就是子网路由表中 `0.0.0.0/0` 是不是指向的 IGW，如果是，就是 Public Subnet，如下面的 `subnet3(igw)`
    ```
    VPC
      - subnet3(igw)    -> route table2  -> 0.0.0.0/0       -> igw
                                         -> 192.168.0.0/16  -> local
    ```
6. Number of private subnets 这里设置为 2 个
7. NAT gateways ($) 设置为 `In 1 AX`
    1. NAT 是需要单独收费的，如果选择 `1 per AZ` 那每个可用区都会设置一个 NAT，对于我们的项目来说一个就够了。
8. VPC endpoints 选择 None

最后生成的网络结构如下：

![Lambda-RDS](/images/posts/lambda-rds/default-vpc.png)

这里有两个 Public Subnet 经过路由表 `project-rbt-public` 将流量流向了 `project-igw`，剩下两个 Private Subnet 各自有一个路由表，最后都将流量流向 `project-nat`。

我们重命名并删除不必要的路由表后：

![Lambda-RDS](/images/posts/lambda-rds/kmind-vpc.png)

1. 每个可用区都包含一个 Public Subnet 和 两个 Private Subnet
2. 两个可用区的所有 Public Subnet 会将**外部**流量通过 kmind-igw-routetable 转发到 IGW 网关
3. 两个可用区的所有 Private Subnet 会将**外部**流量通过 kmind-NAT-routetable 转发到 NAT 网关。

以上是我们的基础网络配置，在配置 AWS 服务时，我们只需要把有外网访问需求的服务部署在 private 子网即可。

> 注意 NAT 的配置，NAT 必须要 Attach 一个 Public 类型的子网才能使得可以从 NAT 访问外部网络，注意看下面的时序图。NAT 访问外部网络的流量最终是从 IWG 网关发出去的。

```
Lambda Connect GitHub -> Route Table1 -> 0.0.0.0/0    --->    NAT
                                                               |
                                                               |
GitHub <- igw <- 0.0.0.0/0 <- Route Table2 <- subnet3(igw) <---/
```

## RDS

RDS 的创建没有太多的注意事项，只需要按照提示一步一步创建就好了。唯一需要注意的是在创建时要选择刚刚创建好的 VPC。

创建好的 RDS 数据库默认情况下是不能直接通过账号密码访问的，因为 PostgreSQL 16 开启了严格模式，在连接数据库时必须要通过 SSL 形式。即除了指定正确的账号密码外，还需要设置正确的证书。

在测试阶段如果不想这么麻烦，可以通过在 Parameter groups 里创建一个自定义的参数组来覆盖它，具体流程为：

1. 前往 [Parameter groups](https://us-east-1.console.aws.amazon.com/rds/home?region=us-east-1#parameter-group-list:) 创建一个新的参数组
2. 在创建好的参数组中将 rds_force_ssl 改为 0
3. 修改数据库，将 DB Parameter Group 改为刚刚创建的参数组。
4. 重启数据库

![Lambda-RDS-Force-SSL](/images/posts/lambda-rds/rds_force_ssl.png)

## Lambda

Lambda 默认情况下并不会部署到 VPC 中，我们需要修改 Lambda 的定义，使它能正常部署到上面创建的 VPC 中。

以 CreateNoteCommandLambda 为例，其配置为：

```yaml
  CreateNoteCommandLambda:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: CreateNoteCommandLambda
      CodeUri: course_deploy.jar
      Handler: com.x.CourseServiceHandler::handleRequest
      Policies:
        # 指定 VPC 策略
        - VPCAccessPolicy: {}
      # VPC 配置
      VpcConfig:
        SecurityGroupIds:
          - sg-12345
        SubnetIds:
          - subnet-12345 # kmind-private1-nat-east-1a
          - subnet-23456 # kmind-private1-nat-east-1b
      Events:
        ApiEvents:
          Type: Api
          Properties:
            RestApiId: !Ref ApiGatewayApi
            Path: /notes
            Method: POST
            Auth:
              Authorizer: NONE
```

新增的配置为：

1. 指定 VPCAccessPolicy 因为 Lambda 需要能访问 VPC
2. 配置 Lambda SubnetVPC
    1. 配置 Lambda 函数的 SecurityGroup，这我在后面说明
    2. 配置 Lambda 函数部署的子网，为了满足跨分区可用，这里指定了不同区域的两个子网。
    3. 注意这里配置的子网应该是上面 VPC 网络设置中的 Private 子网(`kmind-private*`)。

![Lambda-RDS](/images/posts/lambda-rds/kmind-vpc.png)

### Security Group

Security Group 是 AWS 的一种安全机制，用于控制进出的网络流量。你可以将 Security Group 想象成由规则组成的虚拟防火墙。我们的目的是想 Lambda 访问 RDS，所以我们需要配置 Lambda Security Group 的 **Outbound rules**，如：

```
Security group ID     Protocol  Ports  Destination 
sg-0467b06b178edb777  All       All    0.0.0.0/0
```

这代表从 Lambda 访问任意目标地址都是允许的。我们还需要配置 RDS Security Group 的 **Inbound rules** 使得他能允许来自 Lambda 的请求，如：

```
Security group ID      Protocol      Ports   Source
sg-0467b06b178edb777   Custom TCP    5432    0.0.0.0/0 
sg-0467b06b178edb777   AlL           All     sg-0467b06b178edb777
```

到此我们的所有配置就已经结束了，当 Lambda 部署成功后，它应该能同时访问 RDS + 外部网络。
