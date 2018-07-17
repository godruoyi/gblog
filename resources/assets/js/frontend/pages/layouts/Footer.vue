<template>
    <div>
        <footer class="site-footer">
            <div class="container wrapper">
                <ul class="social social--lg">
                    <li>
                        <a rel="nofollow" href="https://twitter.com/godruoyi" class="social__icon icon--twitter">
                            <svg>
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-twitter"></use>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a rel="nofollow" href="https://github.com/godruoyi" class="social__icon icon--github">
                            <svg>
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-github"></use>
                            </svg>
                        </a>
                    </li>
                </ul>
                <nav class="footer__nav">
                    <ol>
                        <li><a target="_blank" href="https://laravel-news.com">Laravel-news</a></li>
                        <li><a target="_blank" href="https://laravel-china.org/users/5359">Laravel-china</a></li>
                        <li><a target="_blank" href="https://github.com/godruoyi">Github</a></li>
                        <li><a target="_blank" href="https://weibo.com/godruoyi">Weibo</a></li>
                        <li><a target="_blank" href="https://twitter.com/godruoyi">Twiter</a></li>
                    </ol>
                </nav>
                <nav class="footer__nav nav--lighter">
                    <ol>
                        <li v-for="link in links" :key="link.id"><a target="_blank" :href="link.link">{{ link.name }}</a></li>
                    </ol>
                </nav>

                <div class="footer__copy">
                    <img src="/vendor/images/dark-ln-elephant.png">
                </div>

                <div class="footer__tribute">
                    <p>Designed By Zaengle &amp; Code by</p>
                    <a href="https://zaengle.com/" class="tribute__logo">
                        <span>Godruoyi</span>
                        <img src="/vendor/images/godruoyi-logo.jpeg">
                    </a>
                </div>
            </div>
        </footer>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0" style="position:absolute; display: none; visibility: hidden; width: 0; height: 0;">
            <symbol id="icon-arrow-down" fill="currentColor" viewBox="0 0 47.484 60.109">
                <path d="M34.648 28.332h-.008c.004.012.004.016.008 0z"></path>
                <path d="M26.773 58.855L46.23 39.398c1.672-1.675 1.672-4.39 0-6.062-1.672-1.676-4.387-1.676-6.062 0l-12.14 12.14V4.286C28.027 1.917 26.107 0 23.74 0c-2.367 0-4.285 1.918-4.285 4.285v41.19L7.315 33.336c-1.672-1.675-4.387-1.675-6.062 0C.418 34.173 0 35.27 0 36.368s.418 2.195 1.254 3.03L20.71 58.856c1.673 1.672 4.387 1.672 6.063 0z"></path>
            </symbol>
            <symbol id="icon-arrow-left" fill="currentColor" viewBox="0 0 60.109 47.484">
                <path d="M31.777 34.648v-.008c-.012.004-.016.004 0 .008z"></path>
                <path d="M1.254 26.773L20.71 46.23c1.676 1.672 4.39 1.672 6.063 0 1.676-1.672 1.676-4.387 0-6.062l-12.14-12.14h41.19c2.368 0 4.286-1.92 4.286-4.286 0-2.367-1.92-4.285-4.286-4.285H14.632l12.14-12.14c1.677-1.673 1.677-4.388 0-6.063C25.938.418 24.84 0 23.743 0c-1.098 0-2.195.418-3.03 1.254L1.253 20.71c-1.672 1.673-1.672 4.387 0 6.063z"></path>
            </symbol>
            <symbol id="icon-arrow-right" fill="currentColor" viewBox="0 0 60.109 47.484">
                <path d="M28.332 12.836v.008c.012-.004.016-.004 0-.008z"></path>
                <path d="M58.855 20.71L39.398 1.255c-1.675-1.672-4.39-1.672-6.062 0-1.676 1.672-1.676 4.387 0 6.062l12.14 12.14H4.287C1.917 19.457 0 21.377 0 23.743c0 2.367 1.918 4.285 4.285 4.285h41.192l-12.14 12.14c-1.677 1.673-1.677 4.388 0 6.063.835.836 1.932 1.254 3.03 1.254 1.098 0 2.194-.418 3.03-1.254l19.457-19.457c1.673-1.672 1.673-4.386 0-6.062z"></path>
            </symbol>
            <symbol id="icon-arrow-up" fill="currentColor" viewBox="0 0 47.484 60.109">
                <path d="M12.835 31.78h.008c-.004-.01-.004-.015-.008 0z"></path>
                <path d="M20.71 1.257L1.253 20.714c-1.672 1.675-1.672 4.39 0 6.062 1.672 1.676 4.387 1.676 6.062 0l12.14-12.14v41.19c0 2.368 1.92 4.286 4.286 4.286 2.367 0 4.285-1.918 4.285-4.285v-41.19l12.142 12.14c1.672 1.676 4.387 1.676 6.062 0 .835-.836 1.253-1.934 1.253-3.03s-.418-2.196-1.254-3.032L26.77 1.257c-1.672-1.672-4.386-1.672-6.062 0z"></path>
            </symbol>
            <symbol id="icon-arrow-thin-down" fill="currentColor" viewBox="0 0 35.1 12.92">
                <path d="M.27 1.918c0-.18-.354-.83-.25-.992C.31.456 1.33-.22 1.8.07L17.52 9.748 33.235.07c.472-.29 1.49.387 1.783.856.29.468-.255 1.55-.725 1.842L18.048 12.77c-.324.2-.734.2-1.058 0L.745 2.768c-.307-.19-.476-.516-.476-.85z"></path>
            </symbol>
            <symbol id="icon-arrow-thin-left" fill="none" viewBox="0 0 31.344 105.69" stroke="currentColor" stroke-width="3px" fill-rule="evenodd">
                <path d="M29.844 2.86l-25 50 25 50"></path>
            </symbol>
            <symbol id="icon-arrow-thin-right" fill="none" viewBox="0 0 30.69 103" stroke="currentColor" stroke-width="3px" fill-rule="evenodd">
                <path d="M4.19 1.51l25 50-25 50"></path>
            </symbol>
            <symbol id="icon-behance" fill="currentColor" viewBox="0 5.8 31.963 20.306">
                <path d="M12.9 14.9s3-.2 3-3.8-2.5-5.3-5.6-5.3H0v19.8h10.4s6.3.2 6.3-5.9c-.1.2.2-4.8-3.8-4.8zM4.6 9.4h5.7s1.4 0 1.4 2.1-.8 2.4-1.8 2.4H4.6V9.4zm5.5 12.8H4.6v-5.3h5.8s2.1 0 2.1 2.7c-.1 2.3-1.6 2.6-2.4 2.6zM25 10.9c-7.6 0-7.6 7.6-7.6 7.6s-.5 7.6 7.6 7.6c0 0 6.8.4 6.8-5.3h-3.5s.1 2.1-3.2 2.1c0 0-3.5.2-3.5-3.5h10.3c0 .1 1.2-8.5-6.9-8.5zm3.1 6h-6.5s.4-3.1 3.5-3.1 3 3.1 3 3.1zM20.8 7H29v2h-8.2z"></path>
            </symbol>
            <symbol id="icon-codepen" fill="currentColor" viewBox="0 0 32 32">
                <path d="M32 10.9v-.2-.2-.2-.1s0-.1-.1-.1V10s0-.1-.1-.1l-.1-.1s-.102 0-.102-.1h-.1L16.8.2c-.5-.3-1.1-.3-1.5 0L.6 10H.5s-.1 0-.1.1l-.1.1-.1.1v.1s0 .1-.1.1V22s0 .1.1.1v.1s0 .1.1.1l.1.102s.1 0 .1.1h.1l14.6 9.8c.2.2.5.2.8.2s.5-.1.8-.2L31.4 22h.1s.1 0 .1-.1l.1-.1.1-.1v-.102s0-.1.102-.1V21.3v-.2-.2-.1V10.9c.098.2.098.1.098 0zm-14.6-7l10.8 7.2-4.8 3.2-6-4V3.9zm-2.8 0v6.4l-6 4-4.8-3.2 10.8-7.2zM2.8 13.7L6.2 16l-3.4 2.3v-4.6zm11.8 14.4L3.9 20.9l4.8-3.2 6 4v6.4h-.1zm1.4-8.8L11.1 16l4.9-3.3 4.9 3.3-4.9 3.3zm1.4 8.8v-6.4l6-4 4.8 3.2-10.8 7.2zm11.8-9.8L25.8 16l3.4-2.3v4.6z"></path>
            </symbol>
            <symbol id="icon-dribbble" fill="currentColor" viewBox="0 0 32 32">
                <path d="M16 32C7.2 32 0 24.8 0 16S7.2 0 16 0s16 7.2 16 16-7.2 16-16 16zm13.5-13.8c-.5-.2-4.2-1.3-8.5-.6 1.8 4.9 2.5 8.9 2.7 9.7 3-2 5.2-5.3 5.8-9.1zm-8.2 10.4c-.2-1.2-1-5.4-2.9-10.4h-.1c-7.7 2.7-10.5 8-10.7 8.5 2.3 1.8 5.2 2.9 8.4 2.9 1.9.1 3.7-.3 5.3-1zM5.8 25.2c.3-.5 4.1-6.7 11.1-9 .2-.1.4-.1.5-.2-.3-.8-.7-1.6-1.1-2.3-6.8 2-13.4 2-14 1.9v.4c0 3.5 1.4 6.7 3.5 9.2zm-3.2-12c.6 0 6.2 0 12.6-1.7-2.3-4-4.7-7.4-5.1-7.9C6.4 5.5 3.5 9 2.6 13.2zM12.8 2.7c.4.5 2.9 3.9 5.1 8 4.9-1.8 6.9-4.6 7.2-4.9-2.4-2.1-5.6-3.4-9.1-3.4-1.1 0-2.2.1-3.2.3zm13.8 4.7c-.3.4-2.6 3.3-7.6 5.4.3.7.6 1.3.9 2 .1.2.2.5.3.7 4.5-.6 9.1.3 9.5.4-.1-3.2-1.2-6.2-3.1-8.5z"></path>
            </symbol>
            <symbol id="icon-facebook" fill="currentColor" viewBox="0 0 32 32">
                <path d="M30.7 0H1.3C.6 0 0 .6 0 1.3v29.3c0 .8.6 1.4 1.3 1.4H17V20h-4v-5h4v-4c0-4.1 2.6-6.2 6.3-6.2 1.8 0 3.3.2 3.7.2v4.3h-2.6c-2 0-2.5 1-2.5 2.4V15h5l-1 5h-4l.1 12h8.6c.7 0 1.3-.6 1.3-1.3V1.3C32 .6 31.4 0 30.7 0z"></path>
            </symbol>
            <symbol id="icon-github" fill="currentColor" viewBox="0 0 32 32">
                <path d="M16 .4C7.2.4 0 7.6 0 16.4c0 7.1 4.6 13.1 10.9 15.2.8.1 1.1-.3 1.1-.8v-2.7c-4.5 1-5.4-2.1-5.4-2.1-.7-1.8-1.8-2.3-1.8-2.3-1.5-1 .1-1 .1-1 1.6.1 2.5 1.6 2.5 1.6 1.4 2.4 3.7 1.7 4.7 1.3.1-1 .6-1.7 1-2.1-3.6-.4-7.3-1.8-7.3-7.9 0-1.7.6-3.2 1.6-4.3-.2-.4-.7-2 .2-4.2 0 0 1.3-.4 4.4 1.6 1.3-.4 2.6-.5 4-.5s2.7.2 4 .5C23.1 6.6 24.4 7 24.4 7c.9 2.2.3 3.8.2 4.2 1 1.1 1.6 2.5 1.6 4.3 0 6.1-3.7 7.5-7.3 7.9.6.5 1.1 1.5 1.1 3v4.4c0 .4.3.9 1.1.8C27.4 29.5 32 23.5 32 16.4c0-8.8-7.2-16-16-16z"></path>
            </symbol>
            <symbol id="icon-googleplus" fill="currentColor" viewBox="0 0 40 25.8">
                <path d="M12.8 25.8C5.7 25.8 0 20 0 12.9S5.7 0 12.8 0c3.3 0 6.4 1.3 8.6 3.3C18.7 5.8 18.8 6 17.8 7c-1.3-1.1-2.8-1.9-5-1.9-4.2 0-7.5 3.4-7.5 7.6s3.3 7.7 7.5 7.7c4.1 0 5.8-2 6.9-5H13v-5h12.2c.8 6.1-1.8 15.4-12.4 15.4M40 13.5h-4v5h-3v-5h-5v-3h5v-4h3v4h4v3z"></path>
            </symbol>
            <symbol id="icon-instagram" fill="currentColor" viewBox="0 0 32 32">
                <path d="M28.2 0H3.8C1.7 0 0 1.7 0 3.8v24.4C0 30.3 1.7 32 3.8 32h24.4c2.1 0 3.8-1.7 3.8-3.8V3.8C32 1.7 30.3 0 28.2 0zM24 4h3c.6 0 1 .4 1 1v3c0 .6-.4 1-1 1h-3c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1zm-8 5.9c3.4 0 6.2 2.7 6.2 6.1 0 3.4-2.8 6.1-6.2 6.1-3.4 0-6.2-2.7-6.2-6.1.1-3.4 2.8-6.1 6.2-6.1zM28 29H4c-.6 0-1-.4-1-1V13h4c-.5.8-.7 2.1-.7 3 0 5.4 4.4 9.7 9.7 9.7 5.4 0 9.7-4.4 9.7-9.7 0-.9-.1-2.3-.8-3h4v15c.1.6-.3 1-.9 1z"></path>
            </symbol>
            <symbol id="icon-linkedin" fill="currentColor" viewBox="0 0 36.89 33.54">
                <path d="M.93 10.75h7.19v22.78H.93zM27.77 10.54c-4.12 0-6.7 2.23-7.18 3.79v-3.58h-8.08c.1 1.9 0 22.78 0 22.78h8.08V21.21a5.2 5.2 0 0 1 .17-1.86 4.12 4.12 0 0 1 3.89-2.79c2.8 0 4.08 2.11 4.08 5.19v11.79h8.15V20.87c0-7.06-4-10.33-9.12-10.33M4.39 0C1.74 0 0 1.71 0 4a4 4 0 0 0 4.29 3.91h.05c2.7 0 4.39-1.75 4.39-4A4 4 0 0 0 4.39 0"></path>
            </symbol>
            <symbol id="icon-pinterest" fill="currentColor" viewBox="0 0 32 32">
                <path d="M16 0C7.2 0 0 7.2 0 16c0 6.8 4.2 12.6 10.2 14.9-.1-1.3-.3-3.2.1-4.6.3-1.2 1.9-8 1.9-8s-.5-1-.5-2.4c0-2.2 1.3-3.9 2.9-3.9 1.4 0 2 1 2 2.3 0 1.4-.9 3.4-1.3 5.3-.4 1.6.8 2.9 2.4 2.9 2.8 0 5-3 5-7.3 0-3.8-2.8-6.5-6.7-6.5-4.6 0-7.2 3.4-7.2 6.9 0 1.4.5 2.8 1.2 3.7.1.2.1.3.1.5-.1.5-.4 1.6-.4 1.8-.2.3-.4.4-.7.2-2-.9-3.2-3.9-3.2-6.2 0-5 3.7-9.7 10.6-9.7 5.6 0 9.9 4 9.9 9.2 0 5.5-3.5 10-8.3 10-1.6 0-3.1-.8-3.7-1.8 0 0-.8 3.1-1 3.8-.4 1.4-1.3 3.1-2 4.2 1.5.5 3.1.7 4.7.7 8.8 0 16-7.2 16-16S24.8 0 16 0z"></path>
            </symbol>
            <symbol id="icon-twitter" fill="currentColor" viewBox="-0.1 3 32.1 26">
                <path d="M32 6.1c-1.2.5-2.4.9-3.8 1 1.4-.8 2.4-2.1 2.9-3.6-1.3.8-2.7 1.3-4.2 1.6C25.7 3.8 24 3 22.2 3c-3.6 0-6.6 2.9-6.6 6.6 0 .5.1 1 .2 1.5-5.5-.3-10.3-2.9-13.6-6.9-.6 1-.9 2.1-.9 3.3 0 2.3 1.2 4.3 2.9 5.5-1.1 0-2.1-.3-3-.8v.1c0 3.2 2.3 5.8 5.3 6.4-.6.1-1.1.2-1.7.2-.4 0-.8 0-1.2-.1.8 2.6 3.3 4.5 6.1 4.6-2.2 1.8-5.1 2.8-8.2 2.8-.5 0-1.1 0-1.6-.1 3 1.8 6.5 2.9 10.2 2.9 12.1 0 18.7-10 18.7-18.7v-.8c1.2-1 2.3-2.1 3.2-3.4z"></path>
            </symbol>
            <symbol id="icon-close" fill="currentColor" viewBox="0 0 24.986 24.987">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M24.986 2.855L22.13 0l-9.65 9.65L2.922.095.094 2.922 9.65 12.48 0 22.13l2.855 2.857 9.652-9.652 9.557 9.558 2.83-2.83-9.56-9.556"></path>
            </symbol>
            <symbol id="icon-search" fill="currentColor" viewBox="0 0 88 88">
                <path d="M86.8 81.2L64.1 58.5C69 52.3 72 44.5 72 36 72 16.1 55.9 0 36 0S0 16.1 0 36s16.1 36 36 36c8.5 0 16.3-2.9 22.5-7.9l22.7 22.7C82 87.6 83 88 84 88c1 0 2-.4 2.8-1.2 1.6-1.5 1.6-4.1 0-5.6zM36 64C20.5 64 8 51.5 8 36S20.5 8 36 8s28 12.5 28 28-12.5 28-28 28z"></path>
            </symbol>
        </svg>
    </div>
</template>

<script>
    export default {
        props: {
            links: {
                required: true,
                type: Array
            }
        }
    }
</script>

<style lang="scss" scoped>
    .footer__tribute img {
        border-radius: 50%;
    }
    .site-footer {
        padding: 20px 0;
    }
</style>
