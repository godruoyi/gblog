<div class="side-menu sidebar-inverse ps ps--theme_default ps--active-y">
    <nav class="navbar navbar-default" role="navigation">
        <div class="side-menu-container">
            <div class="navbar-header">
                <a class="navbar-brand" href="{{ config('app.url') }}">
                    <div class="logo-icon-container">
                        <img src="/vendor/images/logo-icon-light.png" alt="Logo Icon">
                    </div>
                    <div class="title">Gblog</div>
                </a>
            </div><!-- .navbar-header -->

            <div class="panel widget center bgimage" style="background-image:url(/vendor/images/bg.jpg); background-size: cover; background-position: 0px;">
                <div class="dimmer"></div>
                <div class="panel-content">
                    <img src="{{ Auth::user()->avatar ?? '/vendor/godruoyi-logo.png' }}" class="avatar" alt="admin avatar">
                    <h4>{{ Auth::user()->name }}</h4>
                    <p></p>
                    <div style="clear:both"></div>
                </div>
            </div>
        </div>

        <ul class="nav navbar-nav">
            <li>
                <a href="/" target="_self">
                    <span class="icon voyager-boat"></span>
                    <span class="title">控制台</span>
                </a>
            </li>

            <li>
                <a href="{{ route('admin.users.index') }}" target="_self">
                    <span class="icon voyager-group"></span>
                    <span class="title">用户管理</span>
                </a>
            </li>

            <li>
                <a href="{{ route('admin.categories.index') }}" target="_self">
                    <span class="icon voyager-crop"></span>
                    <span class="title">分类管理</span>
                </a>
            </li>

            <li>
                <a href="{{ route('admin.comments.index') }}" target="_self">
                    <span class="icon voyager-tree"></span>
                    <span class="title">评论管理</span>
                </a>
            </li>

            <li>
                <a href="{{ route('admin.posts.index') }}" target="_self">
                    <span class="icon voyager-tree"></span>
                    <span class="title">文章管理</span>
                </a>
            </li>

            <li>
                <a href="{{ route('admin.links.index') }}" target="_self">
                    <span class="icon voyager-anchor"></span>
                    <span class="title">友情链接</span>
                </a>
            </li>
        </ul>
    </nav>
</div>
