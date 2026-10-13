import { defineConfig, passthroughImageService, sharpImageService } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'
import rehypePrettyCode from 'rehype-pretty-code'
import { transformerCopyButton } from '@rehype-pretty/transformers'
import { SITE } from './src/config.ts'
import { remarkReadingTime } from './src/support/plugins.ts'

const ENABLE_S3
  = process.env.S3_ENABLE === 'true'
  || import.meta.env.S3_ENABLE === 'true'

const ENABLE_IMAGE_OPTIMIZE
  = process.env.ASTRO_IMAGE_OPTIMIZE === 'true'
  || import.meta.env.ASTRO_IMAGE_OPTIMIZE === 'true'

export default defineConfig({
    site: SITE.url,

    image: {
        service: ENABLE_IMAGE_OPTIMIZE ? sharpImageService() : passthroughImageService(),
    },

    integrations: [
        partytown(),
        mdx(),
        sitemap(),
        tailwind(),
        react(),

        // 本地先不要启用压缩插件，避免再次触发构建期依赖问题。
        // 如果后面要恢复压缩，再单独加回来测试。
        (await import('@playform/compress')).default({
            CSS: true,
            JavaScript: true,
            HTML: {
                'html-minifier-terser': {
                    collapseWhitespace: true,
                    minifyCSS: false,
                    minifyJS: true,
                },
            },
            Image: false,
            SVG: true,
            Logger: 2,
        }),
    ],

    markdown: {
        syntaxHighlight: false,
        rehypePlugins: [
            [
                rehypePrettyCode,
                {
                    theme: {
                        light: 'github-light',
                        dark: 'github-dark-dimmed',
                    },
                    keepBackground: false,
                    transformers: [
                        transformerCopyButton({
                            visibility: 'always',
                            feedbackDuration: 2500,
                        }),
                        {
                            name: 'chinese-copy-label',
                            code(node) {
                                const button = node.children.find(child => child.tagName === 'button' && child.properties?.class === 'rehype-pretty-copy')
                                if (button) {
                                    button.properties.title = '复制代码'
                                    button.properties['aria-label'] = '复制代码'
                                }
                            },
                        },
                    ],
                },
            ],
        ],
        remarkPlugins: [remarkReadingTime],
    },

    devToolbar: {
        enabled: false,
    },

    prefetch: true,
    output: 'static',

    build: {
        assets: 'assets',
        assetsPrefix: ENABLE_S3 ? 'https://images.godruoyi.com/gblog' : '',
    },

    vite: {
        build: {
            rollupOptions: {
                external: [
                    '../pkg',
                ],
            },
        },
    },
})
