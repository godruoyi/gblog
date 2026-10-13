import type { NavigationLink, Site } from './types.ts'

export const SITE: Site = {
    author: 'Yongjian Peng',
    url: 'https://yongjian-peng.github.io',
    title: 'Yongjian Peng 的技术博客',
    description: '记录技术学习、代码实践与开发中的思考。从工具到系统，让每一次探索都留下有用的笔记。',
    shortDescription: '技术笔记与开发实践',
}

export const NavigationLinks: NavigationLink[] = [
    { name: '文章', url: '/posts' },
    { name: '分类', url: '/categories' },
    { name: '时间线', url: '/timeline' },
    { name: '关于博客', url: '/posts/gblog' },
    { name: '友链', url: '/friends' },
]

export const FooterLinks = [
    {
        section: '博客',
        links: [
            { name: '文章', url: '/posts' },
            { name: '时间线', url: '/timeline' },
            { name: '分类', url: '/categories' },
            { name: '关于博客', url: '/posts/gblog' },
        ],
    },
    {
        section: '其他',
        links: [
            { name: '站点地图', url: '/sitemap-index.xml' },
            { name: 'GitHub', url: 'https://github.com/yongjian-peng' },
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
        // todo: should I use meta or process?
        // process reports an error when used locally,
        // and meta cannot retrieve environment variables in Cloudflare environment.
        // enable: !!(import.meta.env.COMMENT_ENABLE),
        enable: !!(process.env.COMMENT_ENABLE),

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
        uploadAssetsToS3: !!(process.env.S3_ENABLE),
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
            endpoint: process.env.S3_ENDPOINT as string,
            bucket: process.env.S3_BUCKET as string,
            accessKey: process.env.S3_ACCESS_KEY as string,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
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
        'inLanguage': 'zh-CN',
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
