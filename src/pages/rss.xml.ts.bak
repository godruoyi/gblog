// copy from https://github.com/delucis/astro-blog-full-text-rss
// see https://github.com/delucis/astro-blog-full-text-rss/blob/latest/src/pages/rss.xml.ts
// get more context

import { getContainerRenderer as getMDXRenderer } from '@astrojs/mdx'
import rss, { type RSSFeedItem } from '@astrojs/rss'
import type { APIContext } from 'astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { loadRenderers } from 'astro:container'
import { getCollection } from 'astro:content'
import { transform, walk } from 'ultrahtml'
import sanitize from 'ultrahtml/transformers/sanitize'
import { SITE } from '@/config'

export async function GET(context: APIContext) {
    // Get the URL to prepend to relative site links. Based on `site` in `astro.config.mjs`.
    let baseUrl = context.site?.href || 'https://godruoyi.com'
    if (baseUrl.at(-1) === '/') {
        baseUrl = baseUrl.slice(0, -1)
    }

    // Load MDX renderer. Other renderers for UI frameworks (e.g. React, Vue, etc.) would need adding here if you were using those.
    const renderers = await loadRenderers([getMDXRenderer()])

    // Create a new Astro container that we can render components with.
    // See https://docs.astro.build/en/reference/container-reference/
    const container = await AstroContainer.create({ renderers })

    // Load the content collection entries to add to our RSS feed.
    const posts = (await getCollection('posts')).sort((a, b) =>
        a.data.pubDate > b.data.pubDate ? -1 : 1,
    )

    const feedItems: RSSFeedItem[] = []
    for (const post of posts) {
        const { Content } = await post.render()
        const rawContent = await container.renderToString(Content)

        const content = await transform(rawContent.replace(/^<!DOCTYPE html>/, ''), [
            async (node) => {
                await walk(node, (node) => {
                    if (node.name === 'a' && node.attributes.href?.startsWith('/')) {
                        node.attributes.href = baseUrl + node.attributes.href
                    }
                    if (node.name === 'img' && node.attributes.src?.startsWith('/')) {
                        node.attributes.src = baseUrl + node.attributes.src
                    }
                })
                return node
            },
            sanitize({ dropElements: ['script', 'style'] }),
        ])
        feedItems.push({ ...post.data, link: `/posts/${post.slug}/`, content })
    }

    // Return our RSS feed XML response.
    return rss({
        title: SITE.title,
        description: SITE.description,
        site: baseUrl,
        items: feedItems,
    })
}
