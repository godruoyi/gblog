/**
 * Load all posts from my blog database and write them to Markdown file
 *
 * usage:
 *
 * node db_to_md.js db_username db_password
 */

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as fs from 'node:fs'
import mysql from 'mysql2/promise'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class BlogToMarkdown {
    databaseName = 'godruoyi'

    host = '127.0.0.1'

    port = 13306

    constructor() {
        const { username, password } = this.parseProcessArgs()

        this.username = username
        this.password = password
    }

    async run() {
        this.connection = await this.connectMySQL(this.username, this.password)

        const categoryMap = await this.fetchCategories()
        const posts = await this.fetchPosts()

        const formatedPosts = this.formatPosts(categoryMap, posts)

        for (const p of formatedPosts) {
            // this.writePostToMarkdown(p)
            await this.savePostBanner(p)
        }

        console.log('All done')
    }

    async savePostBanner(post) {
        const filePath = this.postBannerFilePath(post)
        console.log('savePostBanner', filePath)

        const response = await fetch(post.banner)

        if (!response.ok) {
            throw new Error('download image failed')
        }

        const arrayBuffer = await response.arrayBuffer()
        const { Buffer } = require('node:buffer')
        fs.writeFileSync(filePath, Buffer.from(arrayBuffer))
    }

    async fetchPosts() {
        const query = 'SELECT * FROM posts ORDER BY id ASC'

        const [rows] = await this.connection.execute(query)

        return rows
    }

    async fetchCategories() {
        const query = 'SELECT * FROM categories ORDER BY id ASC'

        const [rows] = await this.connection.execute(query)

        return rows.reduce((map, obj) => map.set(obj.id, obj), new Map())
    }

    writePostToMarkdown(post) {
        console.log(`saving post to markdown: ${post.title}`)

        const file = this.postToMarkdownFilePath(post)
        const content = this.convertPostToMarkdown(post)

        fs.writeFileSync(file, content, 'utf-8')
    }

    postToMarkdownFilePath(p) {
        return join(__dirname, `./../src/content/posts/${p.slug}.md`)
    }

    postBannerFilePath(p) {
        const name = new URL(p.banner).pathname.split('/').pop()
        return join(__dirname, `./../src/images/posts/${name}`)
    }

    convertPostToMarkdown(post) {
        return `---
title: "${post.title}"
description: "${post.description}"
pubDate: "${this.formatDate(post.pubDate)}"
category: "${post.category.slug}"
cardImage: "${post.banner}"
tags: ["${post.category.slug}"]
oldViewCount: ${post.viewCount}
oldKeywords: ["${post.keyword}"]
---

${post.content}
`
    }

    formatPosts(categoryMap, posts) {
        return posts.map((p) => {
            return {
                title: p.title,
                description: p.excerpt,
                pubDate: p.created_at,
                banner: p.banner,
                category_id: p.category_id,
                category: categoryMap.get(p.category_id),
                slug: p.slug,
                viewCount: p.view_count,
                content: p.content,
                id: p.id,
                keyword: p.keyword,
            }
        })
    }

    async connectMySQL(username, password) {
        return mysql.createConnection({
            host: this.host,
            port: this.port,
            user: username,
            password,
            database: this.databaseName,
        })
    }

    closeConnection() {
        if (this.connection) {
            this.connection.close()
        }
    }

    parseProcessArgs() {
        const username = process.argv[2]
        const password = process.argv[3]

        if (!username || !password) {
            throw new Error('Missing username or password')
        }

        return { username, password }
    }

    formatDate(date) {
        const newDate = new Date(date.getTime() + 8 * 60 * 60 * 1000) // Date object uses milliseconds

        const yyyy = newDate.getUTCFullYear()
        const mm = String(newDate.getUTCMonth() + 1).padStart(2, '0') // Months are zero based
        const dd = String(newDate.getUTCDate()).padStart(2, '0')

        const hh = String(newDate.getUTCHours()).padStart(2, '0')
        const mi = String(newDate.getUTCMinutes()).padStart(2, '0')
        const ss = String(newDate.getUTCSeconds()).padStart(2, '0')

        return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`
    }
}

const x = new BlogToMarkdown()
await x.run()
await process.exit(0)
