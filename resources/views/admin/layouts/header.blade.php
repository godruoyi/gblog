<nav class="navbar navbar-default navbar-fixed-top navbar-top" style="">
    <div class="container-fluid">
        <div class="navbar-header">
            <button class="hamburger btn-link no-animation is-active">
                <span class="hamburger-inner"></span>
            </button>

            <ol class="breadcrumb hidden-xs">
                <li class="active"><i class="voyager-boat"></i> 控制面板</li>
            </ol>
        </div>
        <ul class="nav navbar-nav navbar-right">
            <li class="dropdown profile" id="show-profile-modal">
                <a href="#" class="dropdown-toggle text-right" data-toggle="dropdown" role="button" aria-expanded="false">
                    <img src="{{ Auth::user()->avatar }}" class="profile-img">
                    <span class="caret"></span>
                </a>
                <ul class="dropdown-menu dropdown-menu-animated">
                    <li class="profile-img">
                        <img src="{{ Auth::user()->avatar }}" class="profile-img">
                        <div class="profile-body">
                            <h5>{{ Auth::user()->name }}</h5>
                            <h6></h6>
                        </div>
                    </li>
                    <li class="divider"></li>
                    <li class="class-full-of-rum">
                        <a href="{{ route('admin.users.show', Auth::id()) }}">
                            <i class="voyager-person"></i>
                            个人信息
                        </a>
                    </li>
                    <li>
                        <a href="/" target="_blank">
                            <i class="voyager-home"></i>
                            前台站点
                        </a>
                    </li>
                    <li>
                    <form action="{{ route('admin.logout') }}" method="POST">
                        {{ csrf_field() }}
                        <button type="submit" class="btn btn-danger btn-block">
                            <i class="voyager-power"></i>
                            退出
                        </button>
                    </form>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</nav>
