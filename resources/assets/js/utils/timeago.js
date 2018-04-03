import timeago from 'timeago.js'

export default function (time) {
    return timeago().format(time, 'zh_CN')
}
