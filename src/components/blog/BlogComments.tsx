import * as React from 'react'
import Giscus, { type Repo } from '@giscus/react'
import { Settings } from '@/config.ts'

const id = 'inject-comments'
const commentSetting = Settings.Comment.giscus

function getCurrentTheme(): string {
    if (window.localStorage.getItem('hs_theme')) {
        return window.localStorage.getItem('hs_theme') ?? 'default'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'
}

function convertThemToGiscusThem(them: any): string {
    if (!them) {
        return commentSetting.lightThem
    }

    return them === 'dark' ? commentSetting.darkThem : commentSetting.lightThem
}

function BlogComments({ legacyTitle }: { legacyTitle?: string }) {
    const [mounted, setMounted] = React.useState(false)
    const [theme, setTheme] = React.useState(convertThemToGiscusThem(getCurrentTheme()))

    const handleThemeChange = (event: any) => {
        setTheme(convertThemToGiscusThem(event?.detail))
    }

    React.useEffect(() => {
        const theme = convertThemToGiscusThem(getCurrentTheme())
        setTheme(theme)

        window.addEventListener('on-hs-appearance-change', handleThemeChange)

        return () => {
            window.removeEventListener('on-hs-appearance-change', handleThemeChange)
        }
    }, [])

    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div id={id} className="w-full">
            {mounted
                ? (
                    <Giscus
                        id={id}
                        repo={commentSetting.repo as Repo}
                        repoId={commentSetting.repoId}
                        category={commentSetting.category}
                        categoryId={commentSetting.categoryId}
                        mapping={legacyTitle ? 'specific' : 'pathname'}
                        term={legacyTitle}
                        reactionsEnabled="1"
                        emitMetadata="0"
                        inputPosition="top"
                        lang="zh-CN"
                        loading="lazy"
                        theme={theme}
                    />
                    )
                : null}
        </div>
    )
}

export default BlogComments
