<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<rss xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:wfw="http://wellformedweb.org/CommentAPI/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
    xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
    xmlns:feedpress="https://feed.press/xmlns" version="2.0">

    <channel>
        <feedpress:locale>zh</feedpress:locale>
        <atom:link href="https://godruoyi.com/feeds/" rel="self" />
        <atom:link href="https://godruoyi.superfeedr.com/" rel="hub" />
        <image>
            <link>https://godruoyi.com</link>
            <title><![CDATA[二楞的闲谈杂鱼]]></title>
            <url>https://images.godruoyi.com/logos/god.png</url>
        </image>
        <title>二楞的闲谈杂鱼</title>
        <atom:link href="https://godruoyi.com/feeds/" rel="self" type="application/rss+xml"/>
        <link>https://godruoyi.com</link>
        <description>二楞的闲谈杂鱼.</description>
        <lastBuildDate>{{ $lastat->toAtomString() }}</lastBuildDate>
        <language>zh-CN</language>
        <sy:updatePeriod>hourly</sy:updatePeriod>
        <sy:updateFrequency>1</sy:updateFrequency>
        <generator>https://godruoyi.com</generator>

        @foreach($items as $item)
            <item>
                <title>{{ $item->title }}</title>
                <link>https://godruoyi.com/posts/{{ $item->slug }}</link>
                <pubDate>{{ $item->created_at->toAtomString() }}</pubDate>
                <dc:creator><![CDATA[godruoyi]]></dc:creator>
                <category><![CDATA[{{ $item->category->name }}]]></category>
                <guid isPermaLink="false">https://godruoyi.com/posts/{{ $item->slug }}</guid>
                <description><![CDATA[
                    <p><img src="{{ $item->banner }}"></p>
                    <p>{{ $item->excerpt }}</p>
                    <p>Visit <a href="https://godruoyi.com/posts/{{ $item->slug }}">Godruoyi</a> for the full post.</p>
                    <p>The post <a href="https://godruoyi.com/posts/{{ $item->slug }}">{{ $item->title }}</a> appeared first on <a href="https://godruoyi.com">Godruoyi</a>.</p>
                ]]></description>
                <content:encoded><![CDATA[
                    <p><img src="{{ $item->banner }}"></p>
                    <p>{{ $item->excerpt }}</p>
                    <p>Visit <a href="https://godruoyi.com/posts/{{ $item->slug }}">Godruoyi</a> for the full post.</p>
                    <p>The post <a href="https://godruoyi.com/posts/{{ $item->slug }}">{{ $item->title }}</a> appeared first on <a href="https://godruoyi.com">Godruoyi</a>.</p>
                ]]></content:encoded>
            </item>
        @endforeach
    </channel>
</rss>
