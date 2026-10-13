import type { CollectionEntry } from 'astro:content'

type Post = CollectionEntry<'posts'>

export function sortPosts(posts: Post[]): Post[] {
    return [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.slug.localeCompare(b.slug, 'en'))
}

export function getPostNavigation(posts: Post[], slug: string) {
    const sorted = sortPosts(posts)
    const index = sorted.findIndex(post => post.slug === slug)
    return index < 0 ? {} : { previous: sorted[index - 1], next: sorted[index + 1] }
}

export function getRelatedPosts(posts: Post[], current: Post): Post[] {
    const others = sortPosts(posts).filter(post => post.slug !== current.slug)
    return [
        ...others.filter(post => post.data.category === current.data.category),
        ...others.filter(post => post.data.category !== current.data.category),
    ].slice(0, 3)
}
