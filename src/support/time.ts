import { format } from 'timeago.js'

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Shanghai' }).format(date)
}

function timeago(date?: Date): string {
    return date ? format(date, 'zh_CN') : '暂无更新'
}

export { formatDate, timeago }
