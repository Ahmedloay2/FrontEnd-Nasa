import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'

// Performance monitoring
if (import.meta.env.PROD) {
  console.log('🚀 AstroPass Production Build - NASA Space Apps Challenge 2025')
}

// Error boundary for global errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  // In production, you might want to send this to an error reporting service
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  // In production, you might want to send this to an error reporting service
})

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
