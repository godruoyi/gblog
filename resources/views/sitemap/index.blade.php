<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>

<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>https://godruoyi.com/sitemap/posts</loc>
        <lastmod>{{ $post->created_at->tz('UTC')->toAtomString() }}</lastmod>
    </sitemap>
    <sitemap>
        <loc>https://godruoyi.com/sitemap/categories</loc>
        <lastmod>{{ $category->created_at->tz('UTC')->toAtomString() }}</lastmod>
    </sitemap>
</sitemapindex>
