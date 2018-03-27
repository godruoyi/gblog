require('./slim/slim.js')
// require('./slim/slim.css')

const cropper= new Slim(document.getElementById('myCropper'), {
    ratio: '3:2',
    minSize: {
        width: 360,
        height: 240,
    },
    size: {
        width: 720,
        height: 480,
    },
    // willSave: function(data, ready) {
    //   ready(data);
    // },
    // meta: {
    //     viewid:{{ $viewid }}
    // },

    service: "",
    download: false,
    instantEdit: true,
    label: '上传：单击此处或将图像文件拖到其上',
    buttonConfirmLabel: '确定',
    buttonConfirmTitle: '确定',
    buttonCancelLabel: '取消',
    buttonCancelTitle: '取消',
    buttonEditTitle: '编辑',
    buttonRemoveTitle: '清除',
    buttonDownloadTitle: '下载',
    buttonRotateTitle: '旋转',
    buttonUploadTitle: '上传',
    statusImageTooSmall:'这张照片太小了。 最小的大小是 360 * 240 像素。'
});
