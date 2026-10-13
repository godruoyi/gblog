export interface SearchEntry {
    title: string
    description: string
    tags: string[]
    url: string
}

export function filterPosts(posts: SearchEntry[], query: string): SearchEntry[] {
    const keyword = query.trim().toLocaleLowerCase('zh-CN')
    return posts.filter(post => [post.title, post.description, ...post.tags].join(' ').toLocaleLowerCase('zh-CN').includes(keyword))
}
