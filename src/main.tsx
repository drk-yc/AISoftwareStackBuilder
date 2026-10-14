import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './font-tuning.css' // Saira width/weight tuning — delete this line to revert

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
