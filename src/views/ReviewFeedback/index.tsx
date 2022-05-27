import * as React from 'react'
import MainLayout from '../../layouts/MainLayout'
import styles from './reviewFeedback.module.css'

const ReviewFeedback = () => {
  return (
    <MainLayout loggedIn>
      <h1>Review Feedback Given</h1>

      <div className={styles.feedbackContainer}>
        <ul className={styles.users}>
          <li>
            <h3>Feedback given</h3>
          </li>
          <li>Some person</li>
          <li>Some other person</li>
        </ul>

        <ul className={styles.feedback}>
          <li>
            <h2>Feedback</h2>
          </li>
          <li>some feedback</li>
          <li>some more feedback</li>
        </ul>
      </div>
    </MainLayout>
  )
}

export default ReviewFeedback
