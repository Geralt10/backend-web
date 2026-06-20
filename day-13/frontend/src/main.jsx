import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './features/shared/style.scss'
import App from './App.jsx'
import "./features/shared/button.scss"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
