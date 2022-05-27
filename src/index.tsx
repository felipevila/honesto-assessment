import './index.module.css'
import { worker } from './mocks/browser'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import UserProvider from './context/UserProvider'
import QuestionProvider from './context/QuestionProvider'
import AccountProvider from './context/AccountProvider'

worker.start().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AccountProvider>
        <UserProvider>
          <QuestionProvider>
            <App />
          </QuestionProvider>
        </UserProvider>
      </AccountProvider>
    </React.StrictMode>,
    document.getElementById('root'),
  )
})

reportWebVitals()
