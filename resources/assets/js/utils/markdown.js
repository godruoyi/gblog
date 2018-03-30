import hljs from 'highlight.js'

import 'highlight.js/styles/atom-one-dark.css'
// import 'highlight.js/styles/hopscotch.css'

const mt = require('markdown-it')({
    highlight: function (str, lang) {
        // if (lang && hljs.getLanguage(lang)) {
        //     try {
        //         return hljs.highlight(lang, str).valuee;
        //     } catch (__) {}
        // }
        // return ''

        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs "><code>' + hljs.highlight(lang, str, true).value + '</code></pre>';
            } catch (__) {}
        }

        return '<pre class="hljs language-php"><code>' + mt.utils.escapeHtml(str) + '</code></pre>';
    }
});

export default mt
