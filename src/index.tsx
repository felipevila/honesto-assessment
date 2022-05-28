import './index.module.css'
import '@fontsource/open-sans'
import '@fontsource/open-sans/600.css'
import '@fontsource/open-sans/700.css'
import { worker } from './mocks/browser'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import UserProvider from './context/UserProvider'
import QuestionProvider from './context/QuestionProvider'
import AccountProvider from './context/AccountProvider'
import FeedbackProvider from './context/FeedbackProvider'

worker.start().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AccountProvider>
        <UserProvider>
          <FeedbackProvider>
            <QuestionProvider>
              <App />
            </QuestionProvider>
          </FeedbackProvider>
        </UserProvider>
      </AccountProvider>
    </React.StrictMode>,
    document.getElementById('root'),
  )
})

reportWebVitals()
