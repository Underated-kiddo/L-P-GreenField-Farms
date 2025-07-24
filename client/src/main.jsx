import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Set theme before app loads
const savedTheme = localStorage.getItem("theme") || "system"
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
const resolvedTheme = savedTheme === "system" ? (systemPrefersDark ? "dark" : "light") : savedTheme
document.documentElement.className = resolvedTheme // apply to <html>

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
