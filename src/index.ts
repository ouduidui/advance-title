import './index.css'
import { errorPage } from './pages/error'
import { generatePage } from './pages/generate'
import { indexPage } from './pages/index'

const { pathname } = new URL(document.URL)

if (pathname === '/')
  indexPage()
else if (pathname === '/generate')

  generatePage()
else
  errorPage()
