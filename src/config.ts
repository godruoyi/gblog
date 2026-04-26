import type { NavigationLink, Site } from './types.ts'

export const SITE: Site = {
    author: 'Godruoyi',
    url: 'https://godruoyi.com',
    title: '连波的闲谈杂鱼',
    description: 'Godruoyi\'s personal blog, I enjoy the process of building something using any technology stack',
    shortDescription: '',
}

export const NavigationLinks: NavigationLink[] = [
    { name: 'Posts', url: '/posts/' },
    { name: 'Categories', url: '/categories/' },
    { name: 'Timeline', url: '/timeline/' },
    { name: 'About', url: '/posts/About-godruoyi/' },
]

export const FooterLinks = [
    {
        section: 'Blog',
        links: [
            { name: 'Posts', url: '/posts/' },
            { name: 'Timeline', url: '/timeline/' },
            { name: 'Categories', url: '/categories/' },
            { name: 'About Me', url: '/posts/About-godruoyi/' },
        ],
    },
    {
        section: 'Other',
        links: [
            { name: 'RSS', url: '/rss.xml' },
            { name: 'Site Map', url: '/sitemap-index.xml' },
            { name: 'GitHub', url: 'https://github.com/godruoyi' },
            { name: 'Wechat', url: 'https://images.godruoyi.com/wechat.jpg' },
            { name: 'Friends', url: '/friends/' },
        ],
    },
]

export const Settings = {
    GoogleAnalytics: {
        enable: false,
        id: 'G-TKQ4L3ZDSF',
    },

    // See https://github.com/umami-software/umami
    UmamiAnalytics: {
        enable: true,
        dataWebsiteID: 'bf63658a-9418-4f39-a6a1-5a0cedb6e429',
    },

    Comment: {
        // Please note that the environment value here is `string` type on Cloudflare Pages
        // If you want to disable the comment system, please delete the `COMMENT_ENABLE` environment variable not just set it to `false`.
        enable: !!(import.meta.env.COMMENT_ENABLE) || !!process.env.COMMENT_ENABLE,

        // please visit https://giscus.app/ to learn how to configure it.
        // You can also check out this article: https://liruifengv.com/posts/add-comments-to-astro/.
        giscus: {
            repo: 'godruoyi/gblog',
            repoId: 'MDEwOlJlcG9zaXRvcnkxMjcyODI0NzA',
            category: 'Announcements',
            categoryId: 'DIC_kwDOB5YtJs4CfZnX',
            darkThem: 'noborder_gray',
            lightThem: 'light',
        },
    },

    Assets: {
        // If you don't want to upload the build assert(image/js/css/etc...) to anywhere, just set this to false
        // Please note that the environment value here is `string` type on Cloudflare Pages
        // If you want to disable the comment system, please delete the `S3_ENABLE` environment variable not just set it to `false`.
        uploadAssetsToS3: !!(import.meta.env.S3_ENABLE) || !!process.env.S3_ENABLE,
        config: {
            // see https://github.com/syhily/astro-uploader to get how to configure the uploader,
            // The following configuration will upload the compiled `assets` folder to S3 or R2.
            // You can set a separate domain for it so that you can access all resources using a CDN domain name.
            //
            // For example: https://images.godruoyi.com/gblog/assets/brand-logo.webp
            //
            // Note that you may also need to modify `build.assetsPrefix` in `astro.config.mjs` if you want to
            // automatically replace all images/js/css with a CDN link.
            paths: ['assets'],
            endpoint: (process.env.S3_ENDPOINT ?? import.meta.env.S3_ENDPOINT) as string,
            bucket: (process.env.S3_BUCKET ?? import.meta.env.S3_BUCKET) as string,
            accessKey: (process.env.S3_ACCESS_KEY ?? import.meta.env.S3_ACCESS_KEY) as string,
            secretAccessKey: (process.env.S3_SECRET_ACCESS_KEY ?? import.meta.env.S3_SECRET_ACCESS_KEY) as string,
            root: 'gblog',
        },
    },
}

export const SEO = {
    title: SITE.title,
    description: SITE.description,
    structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'inLanguage': 'en-US',
        '@id': SITE.url,
        'url': SITE.url,
        'name': SITE.title,
        'description': SITE.description,
        'isPartOf': {
            '@type': 'WebSite',
            'url': SITE.url,
            'name': SITE.title,
            'description': SITE.description,
        },
    },
}
