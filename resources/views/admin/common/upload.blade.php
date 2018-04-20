{{-- <div class="slim"
    data-download="true"
    data-service="/slim/imageupload"
    data-default-input-name='file'
    data-label='请上传文章 Banner 图！'
    data-status-file-type="<p>Invalid file type, expects: $0.</p>"
    data-status-file-size="<p>File is too big, maximum file size: $0 MB.</p>"
    data-status-no-support="<p>Your browser does not support image cropping.</p>"
    data-status-image-too-small="<p>Image is too small, minimum size is: $0 pixels.</p>"
    data-status-content-length='<span class="slim-upload-status-icon"></span> 文件太大'
    data-status-unknown-response='<span class="slim-upload-status-icon"></span> 上传失败'
    data-status-upload-success='<span class="slim-upload-status-icon"></span> 上传成功'
    >
</div> --}}

@push('javascript')
    <script src="/vendor/js/slim.kickstart.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function($) {
            Slim.prototype._upload = function(requestdata, e) {
                console.log(requestdata)
                var file = dataURLtoFile(requestdata.output.image, requestdata.input.name)
                var formdata = new FormData;
                formdata.append(this._output.name, file);

                var o = this._element.querySelector(".slim-upload-status")
                var a = this._options.willRequest;
                var i = this;

                m(this._options.service, formdata, a, function (t, e) {
                    i._updateProgress(t / e)
                }, function (t) {
                    console.log(t)
                    setTimeout(function() {
                        o.innerHTML = i._options.statusUploadSuccess,
                        o.setAttribute("data-state", "success"),
                        o.style.opacity = 1,
                        setTimeout(function() {
                            o.style.opacity = 0
                        }, 2e3)
                    }, 250),
                    e(null, t.path)
                }, function (t) {
                    var n = "";
                    n = "file-too-big" === t ? i._options.statusContentLength : i._options.statusUnknownResponse,
                    setTimeout(function() {
                        o.innerHTML = n,
                        o.setAttribute("data-state", "error"),
                        o.style.opacity = 1
                    }, 250),
                    e(t)
                })
            };

            function dataURLtoFile(dataurl, filename) {
                var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }

                return new File([u8arr], filename, {type:mime});
            }

            var d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function(t) { return typeof t }
                : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t }

            function m(t, e, i, n, o, a) {
                var r = new XMLHttpRequest;
                n && r.upload.addEventListener("progress", function(t) {
                    n(t.loaded, t.total)
                }),
                r.open("POST", t, !0),
                i && i(r),
                r.onreadystatechange = function() {
                    if (4 === r.readyState && 200 === r.status) {
                        var t = r.responseText;
                        if (!t.length)
                            return void o();
                        if (t.indexOf("Content-Length") !== -1)
                            return void a("file-too-big");
                        var e = void 0;
                        try {
                            e = JSON.parse(r.responseText)
                        } catch (i) {}


                        console.log(e)

                        if ("object" === ("undefined" == typeof e ? "undefined" : d(e)) && "failure" === e.status)
                            return void a(e.message);
                        o(e || t)
                    } else
                        4 === r.readyState && a("fail")
                }
                ,
                r.send(e)
            }

            console.log(Slim)
        });
    </script>
@endpush

@push('styles')
    <link rel="stylesheet" href="/vendor/js/slim.min.css">
@endpush
