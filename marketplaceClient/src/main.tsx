import { StrictMode } from 'react'
import {BrowserRouter} from 'react-router'
import { createRoot } from 'react-dom/client'
import './styles/theme.css'
import './styles/global.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
