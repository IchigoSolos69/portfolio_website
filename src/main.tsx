import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

// Report web vitals for performance monitoring
import { reportWebVitals } from './utils/web-vitals'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Measure performance in your app
reportWebVitals()
