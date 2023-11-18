import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'

import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { NotificationContextProvider } from './context/NotificationContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <NotificationContextProvider>
        <AuthContextProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
        </AuthContextProvider>
      </NotificationContextProvider>
  </React.StrictMode>,
)
