<template>
    <div>
        <div class="app1-caselist">
            <div class="app1-1080px">
                <ul class="item-cards">
                    <li class="app1-caselist-case ui-list-unstyled" v-for="post in posts" :key="post.id">
                        <div class="post">
                            <div class="app1-caselist-item-title">
                                <router-link class="app1-caselist-item-title-text" :to="{name: 'frontend.post.detail', params: {slug: post.slug}}">{{ post.title }}</router-link>
                                <div class="publish-time"><i class="info-icon s-service"></i><span>{{ post.created_at }}</span></div>
                            </div>
                            <p target="_blank" class="app1-caselist-item-desc">{{ post.body }}</p>
                            <div target="_blank" class="app1-caselist-item-bottom">
                                <a href="">see more</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                posts: []
            }
        },
        created: function () {
            this.$http.get(this.$endpoints.posts.index).then(posts => {
                this.posts = posts.data
            }).catch(e => {})
        }
    }
</script>

<style lang="scss" scoped>
    ul, li {margin: 0; padding: 0;}
    a {outline: none;text-decoration: none;cursor: pointer;}
    .item-cards { box-sizing:border-box;min-height:393px;transition:all .3s ease }
    .item-cards.s-empty:after { display:block }
    .item-cards:after { content:"\62B1\6B49\FF0C\6682\672A\627E\5230\7B26\5408\60A8\641C\7D22\6761\4EF6\7684\6848\4F8B\FF0C\8BF7\91CD\65B0\7B5B\9009\5E7F\544A\6761\4EF6";display:none;padding-top:50px;text-align:center;font-size:16px;color:#919191 }
    .app1-1080px { max-width:1120px;min-width:320px;padding:0 20px;margin:0 auto }
    .app1-caselist { overflow:hidden;padding-top:45px;min-width:1056px;min-width:1060px;background:#f2f3f5;min-height: 500px;}
    .app1-caselist-case { position:relative;display:block;box-sizing:border-box;margin-bottom:45px;height:310px;vertical-align:top }
    .app1-caselist-case .post { display:block;box-sizing:border-box;padding:20px 35px 0;position:relative;height:100%;background:#fff;border-bottom:3px solid transparent;transition:all .3s ease }
    li.app1-caselist-case .post:hover { border-bottom-color:#00c800;transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.12) }
    li.app1-caselist-case .post .app1-caselist-item-logo { transform:translateY(-2px) }
    .app1-caselist-item-logo { width:200px;height:50px;margin:0 auto;transition:all .3s ease }
    .app1-caselist-item-title {margin: 18px 0 28px;}
    .app1-caselist-item-title-text { font-size:24px;font-weight:300;line-height:22px;color:#000;letter-spacing:1px;text-align:left;display:inline-block;}
    .app1-caselist-item-desc {
        // font-size:18px;line-height:26px;text-align:justify;color:#9f9dab ;
        font-size: 16px;
        line-height: 1.8;
        color: #444;
        word-wrap: break-word;
        font-family: Arial,'Hiragino Sans GB',冬青黑,'Microsoft YaHei',微软雅黑,SimSun,宋体,Helvetica,Tahoma,'Arial sans-serif';
        -webkit-font-smoothing: antialiased;
    }
    .app1-caselist-item-bottom {
        position:absolute;left:0;bottom:26px;width:100%;color:#9f9dab; padding:20px 35px 0;
    }
    .publish-time {
        float: right;

        span {
            font-size: 12px;line-height: 20px;
        }
    }
    .info-icon { display:inline-block;margin-right:5px;vertical-align:middle;width:20px;height:20px }
    .info-icon.s-service { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEI1NDYzRjcwRkZBMTFFNkJFOUJDQ0E2MkUxMTZFOTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEI1NDYzRjgwRkZBMTFFNkJFOUJDQ0E2MkUxMTZFOTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowQjU0NjNGNTBGRkExMUU2QkU5QkNDQTYyRTExNkU5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowQjU0NjNGNjBGRkExMUU2QkU5QkNDQTYyRTExNkU5NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkwOqeMAAAFzSURBVHjarNW9S0JhFMfxq0VN0tDS69DaXGlE0NKY2YtC1NIQTi011R/gWGPQUNCYRkWthWNEEfQCBUFDRbM4FYR9T/wEtcfw7cAH5N57fj6X+9xzfdHYnOeoFkRkGF34whtucIhjHSsqvyNsCg+II41xBNCOCR2L65rp0ubmgt9NSCCMJTWW1rNsYwxbCGId36UrTOjkkCMs5whP69qgeotueVYrm0TWq7yy6gkr4zfQHsAGFpHxqq+MejctywKjeMKFV3tZ7yNifm2Nfa/+soyIBQ7ivAGBljFggR14bUCgZXT6tdtbK2jIOXiuN+VDr9Z/5SujsHosywJvtUHrrRFcWeAR5hsQuGBZFphEP0J1hIWUkcw/lFXsoq2GMOvZwQo+8++yrfJEMy5QRVhAPafKKJo2a7jDZYW3H9K19+r9Mw9tni1jBnt4QQpn2rQ2RHoxqsnSpzmYKjdg83Wg249qeltTt86941p/mHR9An4EGAAfe1JwnTpRSAAAAABJRU5ErkJggg==) }
</style>
