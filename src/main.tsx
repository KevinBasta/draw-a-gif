import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
export * from "./common/formats.ts"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
