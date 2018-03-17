<div class="side-menu sidebar-inverse ps ps--theme_default ps--active-y">
    <nav class="navbar navbar-default" role="navigation">
        <div class="side-menu-container">
            <div class="navbar-header">
                <a class="navbar-brand" href="{{ config('app.url') }}">
                    <div class="logo-icon-container">
                        <img src="http://youlejia.test/vendor/tcg/voyager/assets/images/logo-icon-light.png" alt="Logo Icon">
                    </div>
                    <div class="title">Godruoyi</div>
                </a>
            </div><!-- .navbar-header -->

            <div class="panel widget center bgimage" style="background-image:url(http://youlejia.test/vendor/tcg/voyager/assets/images/bg.jpg); background-size: cover; background-position: 0px;">
                <div class="dimmer"></div>
                <div class="panel-content">
                    <img src="{{ Auth::user()->avatar ?? 'http://youlejia.test/storage/users/default.png' }}" class="avatar" alt="admin avatar">
                    <h4>{{ Auth::user()->name }}</h4>
                    <p></p>

                    <div style="clear:both"></div>
                </div>
            </div>
        </div>

        <ul class="nav navbar-nav">
            <li class="active">
                <a href="/" target="_self">
                    <span class="icon voyager-boat"></span>
                    <span class="title">控制台</span>
                </a>
            </li>

            <li>
                <a href="{{ route('admin.users.index') }}" target="_self">
                    <span class="icon voyager-skull"></span>
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
                <a href="{{ route('admin.posts.index') }}" target="_self">
                    <span class="icon voyager-tree"></span>
                    <span class="title">文章管理</span>
                </a>
            </li>

            {{-- <li class="dropdown">
                <a href="#fu-wu-xiang-mu-dropdown-element" data-toggle="collapse" aria-expanded="false" target="_self">
                    <span class="icon voyager-person"></span>
                    <span class="title">服务项目</span>
                </a>
                <div id="fu-wu-xiang-mu-dropdown-element" class="panel-collapse collapse ">
                    <div class="panel-body">
                        <ul class="nav navbar-nav">
                            <li class="">
                                <a href="http://youlejia.test/admin/categories" target="_self">
                                    <span class="icon voyager-photos"></span>
                                    <span class="title">服务类别</span>
                                </a>
                            </li>
                            <li class="">
                                <a href="http://youlejia.test/admin/service-items" target="_self">
                                    <span class="icon voyager-phone"></span>
                                    <span class="title">项目列表</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </li> --}}
            <li class="">
                <a href="#" target="_self">
                    <span class="icon voyager-settings"></span>
                    <span class="title">系统设置</span>
                </a>
            </li>
        </ul>
    </nav>
</div>
