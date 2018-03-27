<template>
    <nav class="site-nav">
        <div class="container wrapper">
            <div class="nav__header">
                <router-link :to="{name: 'frontend.home'}" class="nav__logo">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 91 89" style="enable-background:new 0 0 91 89;" xml:space="preserve" fill="currentColor" class="logo">
                        <g>
                            <path d="M86.5,0h-82C2,0,0,2,0,4.5v80C0,87,2,89,4.5,89h82c2.5,0,4.5-2,4.5-4.5v-80C91,2,89,0,86.5,0z M43.7,67.8 c-0.1,0.5-0.5,0.9-1,0.9H22.3c-1.4,0-2.5-1.1-2.5-2.5V22.4c0.1-0.5,0.5-0.9,1-0.9h3.7c0.5,0.1,0.9,0.5,0.9,1v41h17.4 c0.5,0.1,0.9,0.5,0.9,1V67.8z M72.3,67.2C72.3,67.3,72.3,67.3,72.3,67.2c0,0.9-0.6,1.5-1.4,1.5h-4.1c-0.3,0-0.7,0-1-0.2 c-0.4-0.1-0.6-0.4-0.8-0.7L43.5,30.3v26.3c-0.1,0.5-0.5,0.9-1,0.9h-3.4c0,0-0.1,0-0.1,0s0,0,0.1,0c-0.6,0-1-0.4-1-0.8V23.1 c0-0.1,0-0.1,0-0.1c0-0.8,0.6-1.4,1.4-1.4h4c0.3,0,0.7,0,1,0.2c0.4,0.1,0.6,0.4,0.8,0.7L67,60V22.4c0.1-0.5,0.5-0.9,1-0.9h3.4 c0.5,0.1,0.9,0.5,0.9,1V67.2z"></path>
                        </g>
                    </svg>
                    <p class="logo__title">Gblog</p>
                </router-link>
                <button type="button" class="nav__hamburger js-menu-toggle">
                    <div class="hamburger-box">
                        <div class="hamburger-inner"></div>
                    </div>
                </button>
            </div>
            <div class="nav__container js-menu" style="height: auto; float: right;">
                <div class="nav__main">
                    <ul>
                        <li class="nav__item">
                            <router-link :to="{name: 'frontend.home'}">首页</router-link>
                        </li>
                        <li class="nav__item"><a href="https://github.com/godruoyi/gblog">微博</a></li>
                        <li class="nav__item"><a href="https://github.com/godruoyi/gblog">关于</a></li>
                        <li class="nav__item"><a href="https://github.com/godruoyi/gblog">Github</a></li>
                    </ul>
                </div>
                <div class="nav__footer">
                    <ol>
                        <li><a href="/category/laravel-tutorials">Laravel Tutorials</a></li>
                        <li><a href="/category/laravel-packages">Laravel Packages</a></li>
                    </ol>
                </div>
            </div>
        </div>
    </nav>
</template>
