import Simditor from 'simditor'

import 'simditor/styles/simditor.scss'

let token = document.head.querySelector('meta[name="csrf-token"]');

const editor = new Simditor({
    textarea: $('#sieditor-id'),
    upload: {
        url: $('#sieditor-id').data('upload-url'),
        params: {_token: $('#sieditor-id').data('upload-token')},
        fileKey: 'upload_files',
        connectionCount: 2,
        leaveConfirm: '图片正在上传中，关闭此页面将取消上传。'
    },
    pasteImage: true
})

let content = $('#sieditor-id').text()
if (content) {
    editor.setValue(content)
}
