<template>
    <div>
        <textarea></textarea>
    </div>
</template>

<script>
    import SimpleMDE from 'simplemde'

    require('inline-attachment/src/inline-attachment.js')
    require('inline-attachment/src/codemirror-4.inline-attachment.js')

    export default {
        name: 'markdown-editor',
        data () {
            return {
                simplemde: null
            }
        },
        props: {
            // element: String,
            attachments: {
                type: Object,
                default () {
                    return {}
                }
            },
            configs: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        mounted: function () {
            this.initSimplemde()
        },

        methods: {
            initSimplemde: function () {
                const configs = Object.assign({
                    element: this.$el.firstElementChild,
                }, this.configs);

                if (configs.initialValue) {
                    this.$emit('change', configs.initialValue);
                }

                this.simplemde = new SimpleMDE(configs);

                this.uploadImageSupport()
                this.bindingEvents()
            },

            uploadImageSupport: function () {
                inlineAttachment.defaults = Object.assign(inlineAttachment.defaults, this.attachments)

                inlineAttachment.editors.codemirror4.attach(this.simplemde.codemirror, {
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
            },

            bindingEvents: function () {
                let _this = this
                this.simplemde.codemirror.on("change", function() {
                    _this.$emit('change', _this.simplemde.value());
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    @import '~simplemde/dist/simplemde.min.css';
</style>
