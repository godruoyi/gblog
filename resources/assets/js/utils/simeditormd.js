import SimpleMDE from 'simplemde'

require('inline-attachment/src/inline-attachment.js')
require('inline-attachment/src/codemirror-4.inline-attachment.js')

require('simplemde/src/css/simplemde.css')

const simplemde = new SimpleMDE({
    element: document.getElementById("sieditor-id"),
    // autosave: {
    //     enabled: true,
    //     uniqueId: 'simplemde-auto-unique-id',
    // },
    placeholder: '请使用 Markdown 格式书写～_～，支持图片拖拽和剪切板上传。',
    spellChecker: false,
});

inlineAttachment.defaults.uploadUrl = $('#sieditor-id').data('upload-url');
inlineAttachment.defaults.extraParams = {_token: $('#sieditor-id').data('upload-token')};
inlineAttachment.defaults.uploadFieldName = 'upload_files';

inlineAttachment.editors.codemirror4.attach(simplemde.codemirror, {
    onFileUploadResponse: function(xhr) {
        var result = JSON.parse(xhr.responseText),
        filename = result[this.settings.jsonFieldName];

        if (result && filename) {
            var newValue;
            if (typeof this.settings.urlText === 'function') {
                newValue = this.settings.urlText.call(this, filename, result);
            } else {
                newValue = this.settings.urlText.replace(this.filenameTag, filename);
            }
            var text = this.editor.getValue().replace(this.lastValue, newValue);
            this.editor.setValue(text);
            this.settings.onFileUploaded.call(this, filename);
        }
        return false;
    }
});
