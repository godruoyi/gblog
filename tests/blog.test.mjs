import assert from 'node:assert/strict'
// eslint-disable-next-line test/no-import-node-test -- Keep the tests on Node's built-in runner without another dependency.
import { test } from 'node:test'
import { getPostNavigation, getRelatedPosts, sortPosts } from '../src/support/posts.ts'
import { filterPosts } from '../src/support/search.ts'

const post = (slug, category, date = '2024-05-15') => ({ slug, data: { category, pubDate: new Date(date) } })

test('same-date posts have stable navigation without mutating the collection', () => {
    const posts = [post('z', 'php'), post('a', 'astro'), post('old', 'php', '2020-01-01')]
    assert.deepEqual(sortPosts(posts).map(p => p.slug), ['a', 'z', 'old'])
    assert.equal(posts[0].slug, 'z')
    assert.deepEqual(getPostNavigation(posts, 'z'), { previous: posts[1], next: posts[2] })
    assert.equal(getPostNavigation(posts, 'a').previous, undefined)
    assert.equal(getPostNavigation(posts, 'old').next, undefined)
    assert.deepEqual(getPostNavigation(posts, 'missing'), {})
})

test('related posts prioritize category, exclude current and fill remaining slots', () => {
    const current = post('current', 'php')
    const same = post('same', 'php', '2020-01-01')
    const recent = post('recent', 'astro', '2025-01-01')
    assert.deepEqual(getRelatedPosts([current, recent, same], current).map(p => p.slug), ['same', 'recent'])
    assert.deepEqual(getRelatedPosts([current], current), [])
})

test('search matches Chinese, case-insensitive titles, descriptions and optional tags', () => {
    const posts = [
        { title: '为什么选择 Astro？', description: '中文静态博客', tags: ['前端'], url: '/posts/why-astro/' },
        { title: 'PHP 开发', description: '服务端框架', tags: [], url: '/posts/why-laravel/' },
    ]
    assert.deepEqual(filterPosts(posts, ' astro '), [posts[0]])
    assert.deepEqual(filterPosts(posts, '中文'), [posts[0]])
    assert.deepEqual(filterPosts(posts, '前端'), [posts[0]])
    assert.deepEqual(filterPosts(posts, '   '), posts)
    assert.deepEqual(filterPosts(posts, '没有结果'), [])
})
