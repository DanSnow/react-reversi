import './styles/main.css'
import './i18n'

import { createRoot } from 'react-dom/client'

import App from './App'

const root = createRoot(document.getElementById('root'))

root.render(<App />)
