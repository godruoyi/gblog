---
title: "Mysql游标入门"
description: "> MySQL检索操作返回一组称为结果集的行。这组返回的行都是与SQL语句相匹配的行（零行或多行）。使用简单的SELECT语句，例如，没有办法得到第一行、下一行或前10行，也不存在每次一行地处理所有行的简单方法（相对于..."
pubDate: "2018-04-04 07:43:48"
category: "mysql"
banner: "/images/banners/_1553621481_JkgiDiMr2h.png"
tags: ["mysql"]
oldViewCount: 353
oldKeywords: ["null"]
---

> MySQL检索操作返回一组称为结果集的行。这组返回的行都是与SQL语句相匹配的行（零行或多行）。使用简单的SELECT语句，例如，没有办法得到第一行、下一行或前10行，也不存在每次一行地处理所有行的简单方法（相对于成批地处理它们）。
> 
> 有时，需要在检索出来的行中前进或后退一行或多行。这就是使用游标的原因。游标（cursor）是一个存储在MySQL服务器上的数据库查询，它不是一条SELECT语句，而是被该语句检索出来的结果集。在存储了游标之后，应用程序可以根据需要滚动或浏览其中的数据。
> 
> 游标主要用于交互式应用，其中用户需要滚动屏幕上的数据，并对数据进行浏览或做出更改。

**创建游标**

创建一个简单的游标
```
create procedure simplecursor()
begin
	declare youbiaoName cursor
	for
	select name from user;
	
	open youbiaoName;  -- 打开游标
	-- //some code
	close youbiaoName; -- 关闭游标,释放游标使用的所有内部内存和资源
end;
```
定义了一个游标，使用declare 游标名 cursor for 来定义游标，该处查询用户表里的用户名， 存储过程处理完成后，游标就消失（因为它局限于存储过程），并没有任何返回和输出。

```
create procedure simplecursor2()
begin
	declare tmp int; -- 定义局部变量
	declare youbiao2 cursor for select name from user; -- 定义游标

	open youbiao2;
		fetch youbiao2 into tmp;
	close youbiao2;
end;
```
该过程定义一个局部变量和游标， 该游标返回了用户表得所用用户名组成的集合，即如下所示
| name|
| ------------- |
| admin |
| admin1 |
| admin2 |
| admin3 |
然后在游标开启-关闭内， 用fetch遍历每一行， 把得到的数据(即name的值) into  给局部变量tmp。此处只完成了这个流程， 什么都没做。
**注：** 该fetch并没有结束标志， 调用时会一直遍历下去， 当遍历完最后一行再继续遍历时，会出现错误，[Err] 1366 - Incorrect integer value:

改进如下

```
create procedure simplecursor3()
begin
	declare done boolean default 0; -- 定义一个循环标记默认值为false
	declare tmp int; -- 定义局部变量
	declare youbiao3 cursor for select name from user; -- 定义游标
	-- 当出现02000错误时把局部变量的值设为true
	declare continue handler for sqlstate '02000' set done 1; 
	
	open youbiao3;

	REPEAT
		fetch youbiao3 into tmp;
	until done end REPEAT;	-- 当done为true时结束repeat，
	
	close youbiao3;
end;
```

> 与前一个例子一样，这个例子使用FETCH检索当前name到声明的名为tmp的变量中。但与前一个例子不一样的是，这个例子中的FETCH是在REPEAT内，因此它反复执行直到done为真（由UNTIL done END REPEAT;规定）。为使它起作用，用一个DEFAULT 0（假，不结束）定义变量done。那么，done怎样才能在结束时被设置为真呢？答案是用以下语句：
> 
declare continue handler for sqlstate '02000' set done 1;

> 这条语句定义了一个CONTINUE HANDLER，它是在条件出现时被执行的代码。这里，它指出当SQLSTATE '02000'出现时，SET done=1。SQLSTATE '02000'是一个未找到条件，当REPEAT由于没有更多的行供循环而不能继续时，出现这个条件。

复杂一点的游标使用：创建一个新的表， 把用户和该用户的所有订单金额存入该表。

```
create procedure myyoubiao ()
BEGIN
	declare done boolean default 0; --循环标记
	declare tmp int; -- 临时存储变量
	declare t DECIMAL(8,2); -- 同上
	
	declare myyoubiao4 CURSOR for select id from user;
	declare continue handler for sqlstate '02000' set done = 1;

	create table if not exists mytable -- 表不存在是创建， 存在时跳过
	(uId int, total decimal(8,2));

	open myyoubiao4;
	
	REPEAT
		fetch myyoubiao4 into tmp;
			call getTotalByUser2(tmp, 1, t); -- 根据用户id获取该用户总订单金额， 含税
			insert into mytable(uId,total) values(tmp,t); --插入新表
	UNTIL done end REPEAT;
	CLOSE myyoubiao4;
END
```
调用该过程时， 会自动创建一张包含用户id和用户订单总额的表(若不存在)， 再把遍历每一个用户， 通过[上一节](http://blog.csdn.net/xu5733127/article/details/49795913)创建的过程返回用户的订单总额，插入新创建的表中。
