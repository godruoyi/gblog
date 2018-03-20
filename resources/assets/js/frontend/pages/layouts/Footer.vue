<template>
    <div id="footer-zone" class="footer">
        <div class="footer-outer" style="max-width: 1080px; margin: 0px auto;">
            <div class="footer-upper">
                <div class="footer-wrapper s-upper">
                    <ul class="footer-item s-first">
                        <li class="info">
                            <div class="info-title"><i class="info-icon s-attendance"></i> <span>客服电话</span></div>
                            <div class="info-desc">0755 - 8376 5566</div>
                        </li>
                        <li class="info">
                            <div class="info-title"><i class="info-icon s-phone"></i> <span>销售热线</span></div>
                            <div class="info-desc">400 810 5881</div>
                        </li>
                    </ul>
                    <ul class="footer-item s-second">
                        <li class="info">
                            <div class="info-title"><i class="info-icon s-service"></i> <span>服务时间</span></div>
                            <div class="info-desc">工作日 09:00-18:00</div>
                        </li>
                        <li class="info">
                            <div class="info-title"><i class="info-icon s-mail"></i> <span>联系邮箱</span></div>
                            <div class="info-desc"><a href="mailto:wxad@tencent.com" class="footer-link">wxad@tencent.com</a></div>
                        </li>
                    </ul>
                    <ul class="footer-item s-third">
                        <li class="info">
                            <div class="info-title">微信广告助手</div>
                            <div class="info-desc"><img src="//wximg.qq.com/wxp/home-site/build/dist/95b895b8072ee9f58bb6f667cc457ad4.png" alt="微信广告助手二维码" style="width: 100px;"></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer-lower">
                <div class="footer-wrapper"><a href="//www.tencent.com/zh-cn/index.shtml" class="footer-link">关于腾讯</a> <a href="https://mp.weixin.qq.com" class="footer-link">公众平台</a> <a href="https://mp.weixin.qq.com/cgi-bin/readtemplate?t=home/adclient_agreement_tmpl" class="footer-link">服务条款</a> <span class="ui-fl-r">
            Copyright © 1998-2018 Tencent <span>All Rights Reserved.</span></span>
                </div>
            </div>
        </div>
        <a id="go-top" href="javascript:void(0)" class="back-to-top" style="display: none;"></a>
    </div>
</template>

<style lang="scss" scoped>
    .footer {color: #6e6f73;}
    .footer,.footer-outer { background:#28292b }
    .footer-wrapper { margin:0 auto;padding:0 20px }
    .footer-wrapper.s-upper { border-right:1px solid #3a3b3d }
    .footer-upper { font-size:0;border-bottom:1px solid #3a3b3d;padding-top:50px;padding-bottom:50px }
    .footer-item { list-style:none;font-size:14px;display:inline-block;vertical-align:top }
    .footer-item.s-first { width:32.4074074% }
    .footer-item.s-second { width:32.8703704%;border-right:1px solid #3a3b3d }
    .footer-item.s-third { margin-left:12.962963% }
    .footer-item.s-third .info { margin-bottom:0 }
    .footer-item.s-third .info-title { height:22px;margin-bottom:5px;overflow:hidden;text-align:justify }
    .footer-item.s-third .info-title:after { content:"";display:inline-block;width:100%;height:0;line-height:0 }
    .footer-item.s-third .info-desc { text-indent:0 }
    .footer-lower { font-size:14px;line-height:70px;text-align:left;color:#6e6f73;letter-spacing:1px }
    .footer-link { color:#6e6f73;margin-right:50px }
    .footer-link:hover { color:#6b6b6d }
    .info:first-child { margin-bottom:40px }

    .info-title { letter-spacing:1px }
    .info-desc { font-size:16px;color:#979aa2;text-indent:3em }
    .info-desc .footer-link { color:inherit }
    .info-icon { display:inline-block;margin-right:22px;vertical-align:middle;width:20px;height:20px }
    .info-icon.s-attendance { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjAwMzlCMDgwRkZBMTFFNkJFOUJDQ0E2MkUxMTZFOTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjAwMzlCMDkwRkZBMTFFNkJFOUJDQ0E2MkUxMTZFOTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMDAzOUIwNjBGRkExMUU2QkU5QkNDQTYyRTExNkU5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyMDAzOUIwNzBGRkExMUU2QkU5QkNDQTYyRTExNkU5NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqPYPE4AAAH0SURBVHjanJVNKERRFMffDNGUj9j4HoaFMilK0WwQGSsLxSRiysKOjRQ1C1lSJCsfCxE2LLBBiUzMsFFkxcYsJKUGRSj+J391vd6bGXPqV++de85/3r3nnjOWtvYOzcSqgBc0gUL6bsEOWARnRklWA58NzIID8Am6QDrppO+AMTZ9cqLuPQFsgVxQAa5166dkBmyCbdAMPsy+cBiUgFpgAesgDL5ImD4LY4qBz2zLWWCE55YJ/OAQOCggFNHnZ0w3GGTuzxadzvLf5z6QDMZ4PstgGrwqP/oGgjwaERsHdTzLE/0XusEqnxvBkmZuc6y+xoq71S3bwS5oAE7608BjBEFZS+FzJXNFwy6CC7wGGcCj/d88zBWNRRGsARPgGeTEIZjDXDlvlwgGWKlUcMegF76bWRpjNObI9vvBsQj2gnpwrxQiyMKYmZsxGnMeqOG1mPRyK++kC7zr1pLYx6NgI5Ze1hgog2AN5Cv+fF6tGyOxSIIyXc5BCwgprRei74idElVQWmsF7IMnUKC03S92igd45XLNBF0MugSlYEqpump3XCtjrORUG40v6d0eDtBYTObiJEVXOXn+fKHjH2Kq7TE3YlHiNquu4eNpvWx1kKiCcuPnGRCr5bHS80aCQ/wPuVLuXTQumOMzqrK02ACJ274FGAC6yXk9luHWwgAAAABJRU5ErkJggg==);height:24px }
    .info-icon.s-phone { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTc0NUNENUUwRjdDMTFFNkJFOUJDQ0E2MkUxMTZFOTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEI1NDYzRjAwRkZBMTFFNkJFOUJDQ0E2MkUxMTZFOTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNzQ1Q0Q1QzBGN0MxMUU2QkU5QkNDQTYyRTExNkU5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNzQ1Q0Q1RDBGN0MxMUU2QkU5QkNDQTYyRTExNkU5NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ppsr7agAAAGmSURBVHjanNRNKERRFMDxmTGlKcnUJMVCCWUxshCyQtmIjJqZyEcsSIlQWEik7KZQImGBFEuaZCUbJRsWRBY+slAWCqUp5H/rTN15zYf3Tv168959nTn3nXuv3R9otWlRiACOcWr7R+zt7sTcO7TfDbiASxJW2SyEU65dWJLqwrjFKsrwbSZhtMIx1EkyFVs4QZ/ZClVCD7JxZhhbxjSyzCZ04y3O2BXWzVapEr6gwNCgaDyjyGzCD1yi1DCmltAgQlaaso12w1gPNnBtJeEaOlFpaMoUvFYSvmMU/drYE0ZkKeWZTahiE5mY0Z6tSKVqTRZrz3MT/Ymxs70ydb3SOSzK3g6iHvcyg3Ag2FaSLOErmjCLbu35Alrgw75s0TQcqhVC0hAy1It2w2kTjXIcYUL2tB7piGj3LvlMKpHPmeDbnqNWGuKRaUcjYji+vtRZQIU3XOcdSRqmjrIKNMuU3SkanINHR4qX1Narxqds0SGZckxQ3TCXAYwn+obxQi2bSfjlUzxIU72yjBqZ/p3TxCZQh26H7O8a5OMXB2qdkuxHvfQnwABOKFtbd990JwAAAABJRU5ErkJggg==) }
    .info-icon.s-service { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEI1NDYzRjcwRkZBMTFFNkJFOUJDQ0E2MkUxMTZFOTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEI1NDYzRjgwRkZBMTFFNkJFOUJDQ0E2MkUxMTZFOTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowQjU0NjNGNTBGRkExMUU2QkU5QkNDQTYyRTExNkU5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowQjU0NjNGNjBGRkExMUU2QkU5QkNDQTYyRTExNkU5NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkwOqeMAAAFzSURBVHjarNW9S0JhFMfxq0VN0tDS69DaXGlE0NKY2YtC1NIQTi011R/gWGPQUNCYRkWthWNEEfQCBUFDRbM4FYR9T/wEtcfw7cAH5N57fj6X+9xzfdHYnOeoFkRkGF34whtucIhjHSsqvyNsCg+II41xBNCOCR2L65rp0ubmgt9NSCCMJTWW1rNsYwxbCGId36UrTOjkkCMs5whP69qgeotueVYrm0TWq7yy6gkr4zfQHsAGFpHxqq+MejctywKjeMKFV3tZ7yNifm2Nfa/+soyIBQ7ivAGBljFggR14bUCgZXT6tdtbK2jIOXiuN+VDr9Z/5SujsHosywJvtUHrrRFcWeAR5hsQuGBZFphEP0J1hIWUkcw/lFXsoq2GMOvZwQo+8++yrfJEMy5QRVhAPafKKJo2a7jDZYW3H9K19+r9Mw9tni1jBnt4QQpn2rQ2RHoxqsnSpzmYKjdg83Wg249qeltTt86941p/mHR9An4EGAAfe1JwnTpRSAAAAABJRU5ErkJggg==) }
    .info-icon.s-mail { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDExRUJDQjEwRkZBMTFFNkJFOUJDQ0E2MkUxMTZFOTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDExRUJDQjIwRkZBMTFFNkJFOUJDQ0E2MkUxMTZFOTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMDAzOUIwRTBGRkExMUU2QkU5QkNDQTYyRTExNkU5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MTFFQkNCMDBGRkExMUU2QkU5QkNDQTYyRTExNkU5NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkfDwnMAAADRSURBVHjaYgwNi/RkYGCYC8SSDJSB50CczAI1TIqBOuAZE5LL1gOxDBmGyED1goAkE5LEQiDeBcT5QMxMhEHMULW7oHrBANnADUBsDsSKQHwMiI3xGAaSOwpVaw7VCwYsaAo/A3EBVMNUID4BxDVA/AUqzwPELUBsAcQ5QHwG3SYmHC44C8Q2QHwfiE8BsT8Un4KK2WAzDJsLkcEfIJ4IxOuAeDJUzB2IH+MLWBYiAh9kQACxUc7EQGUwNAx8TkXzXoAMTIEa+p9C/ARUOAAEGADADDRRhlz1+gAAAABJRU5ErkJggg==);height:14px }
    @media (max-width:850px) { .footer-link { display:none }
    .footer-wrapper span { font-size:12px;float:none;display:block;text-align:center }
    .footer-item.s-first,.footer-item.s-second,.footer-wrapper span span { display:none }
    .footer-item.s-third { margin-left:50%;transform:translateX(-50%) }
     }

    .back-to-top { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA1CAYAAAAK0RhzAAAABGdBTUEAALGPC/xhBQAAAyhJREFUaAXtmFtIVEEYx/9nd93NlUXRJLXVICm0XRUMJOrResjeyi4Q9BJJBJH5nKhBRBQRRQ9hF4J6CArtQhcKtQjWjG5o0k3ylpiarrbe9mY7J85hTTnqmTPHk8wsu2fmm5kz3+/7zzd7dgWbxzyFJVhMS5BJROJg/5uyXDGumEEiwLeiQYSYtxtcsXmHyiADdVNso2MT7mY9gN1k1wVdFzACdWvtbQTCftzPeqgLHHMwCWrf170o/rIdreOtusAxBYuGqh+pE7fg4e+HdIFjBjYblJRcesAxAVOC0gtOc7D5QOkBpynYQqBYw2kGpgaKJZwmYDRQrOCowbSAYgEn0P5LlWvPQ4//BwaCA5J/1Nccey46JzswHBpWfS9qMNUrM55IvRUZ+6f69hxMdegWaSJXbJECr3pZrpjq0C3SRAvNukdSjyLDmjHrLc73nkNH5EuW/MdRsuIg8uPWIzAVQJOvEZd/ViMUeZFSmlqGdGu6WCe2Jt8rPPM+hTfkFW1qP6i2YuNvD554H4vvwvjNaJv4Jre9QS/SYtLw0u1BoiURF3sv4FrfFWTHulDneo44U5zo8+7le/B54pM4r2G4AeSp40PeR6TEpKhlEudp9uRR73qBsvZSvBt9Kzt0NfM6uvydqOgql22kcmbVWYyERnC8uxKenCYcaNuPlrFmeUyFswpj4TGc7jkl2xZaoVJMaTEBAnYkFaN2sGbGMKLezqRdM+ySwWayYTw8LjVVXalyTGlFp9UpPsRGKyiNb59sh9P2N6+IbWtCEdyxblgECwocG1CUsA0FzfnScFVXZooNBgfF3CL59W9xmB3whXyy2Rk5PFYvy8RKmxM1v+4g+/0akPk0hZlio+FR8TAhatwcuDHNx8L4LXjjey3bqvsuTcsxuYOiwkwx4lN557FpxzmxuSJb7kTGSVR1V5Ims8JMMeLxvaFamAUzHq2LfC8Fh2AVrGK7JHIKzpZ7WlJqdtzP5VSyJRn+KT/Vr+K51ojuZ6pY9EL9wf7oJvM60xxj7r3CAhxMITiG7OKKGVIWBae4YgrBMWQXV8yQsig4xRVTCI4hu/4A6GkzwBTdAwoAAAAASUVORK5CYII=);width:54px;height:54px;position:fixed;right:50px;bottom:72px }
</style>
