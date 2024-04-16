import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import type { QueryType } from '../type'

dayjs.extend(duration)
const diffDomId = 'diff-text'

export function indexPage() {
  const {
    cn,
    en,
    date,
  } = [...new URL(document.URL).searchParams.entries()].reduce<QueryType>((acc, cur) => {
    Object.assign(acc, { [cur[0]]: cur[1] })
    return acc
  }, {} as QueryType)

  const locale = navigator.language
  const text = locale === 'zh-CN' ? cn : en

  const diff = diffDate(date!, locale)

  document.querySelector('#root')!.innerHTML = `
    <div class="content">
      <div class="index-title">${text}</div>
      <div class="index-date" id="${diffDomId}">${diff}</div>
    </div>
    `

  if (diff) {
    setInterval(() => {
      const newDiff = diffDate(date!, locale)
      const dom = document.querySelector(`#${diffDomId}`) as HTMLParagraphElement
      if (newDiff && dom)
        dom.textContent = newDiff
    }, 500)
  }
}

function diffDate(date: string, locale: string) {
  const startDate = dayjs(Number(date))
  if (!startDate.isValid())
    return

  const diff = dayjs.duration(dayjs().diff(startDate, 'day', true), 'days')
  const durations = [diff.years(), diff.months(), diff.days(), diff.hours(), diff.minutes(), diff.seconds()]

  let isStart = false
  const isCn = locale === 'zh-CN'
  const text = isCn ? ['年', '月', '天', '小时', '分钟', '秒'] : ['Year', 'Month', 'Day', 'hour', 'min', 'second']
  return text.reduce((acc, cur, index) => {
    const count = durations[index]
    if (!isStart && count <= 0)
      return acc

    isStart = true
    acc += `${durations[index]}${cur}`
    if (!isCn && durations[index] > 1)
      acc += 's'

    if (!isCn)
      acc += ' '

    return acc
  }, '')
}
