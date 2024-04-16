import dayjs from 'dayjs'
import qs from 'qs'
import type { QueryType } from '../type'

const { origin } = new URL(document.URL)
const codeElmId = 'code-block'
const dateInputElmId = 'date-input'
const cnTextInputElmId = 'cn-text-input'
const enTextInputElmId = 'en-text-input'

const opt: QueryType = {
  date: undefined,
  cn: undefined,
  en: undefined,
}

export function generatePage() {
  const today = dayjs().format('YYYY-MM-DD')
  document.querySelector('#root')!.innerHTML = `
    <div class="content">
      <h2>Generate your anniversary page</h2>
      <div>
        <span>Date: </span>
        <input id="${dateInputElmId}" type="date" max=${today} />
      </div>
      <div>
        <span>CN Text: </span>
        <input id="${cnTextInputElmId}" type="text" />
      </div>
       <div>
        <span>EN Text: </span>
        <input id="${enTextInputElmId}" type="text" />
      </div>
      <code id="${codeElmId}">${origin}</code>
    </div>
  `

  const dateInputDom = document.querySelector(`#${dateInputElmId}`) as HTMLInputElement
  const cnTextInputDom = document.querySelector(`#${cnTextInputElmId}`) as HTMLInputElement
  const enTextInputDom = document.querySelector(`#${enTextInputElmId}`) as HTMLInputElement

  dateInputDom?.addEventListener('input', () => {
    const value = dateInputDom.valueAsNumber || undefined
    opt.date = `${value}`
    updateUrl()
  })

  cnTextInputDom?.addEventListener('input', () => {
    const value = cnTextInputDom.value || undefined
    opt.cn = value
    updateUrl()
  })

  enTextInputDom?.addEventListener('input', () => {
    const value = enTextInputDom.value || undefined
    opt.en = value
    updateUrl()
  })
}

function updateUrl() {
  const url = `${origin}?${qs.stringify(opt)}`
  const dom = document.querySelector(`#${codeElmId}`)
  if (dom)
    dom.innerHTML = url
}
