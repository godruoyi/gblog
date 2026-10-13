import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

export function remarkReadingTime() {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    return function (tree, { data }) {
        const textOnPage = toString(tree)
        const readingTime = getReadingTime(textOnPage)

        data.astro.frontmatter.minutesRead = `约 ${Math.max(1, Math.ceil(readingTime.minutes))} 分钟阅读`
    }
}
