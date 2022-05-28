import styles from './feedbackResults.module.css'
import * as React from 'react'

type Props = {
  person: any
  feedback: any
  handleRenderQuestion: any
}

const FeedbackResults = (props: Props) => {
  const { feedback, person, handleRenderQuestion } = props

  return (
    <ul className={styles.feedback}>
      <li style={{ borderBottom: 'none' }}>
        <h2>{person.name} Feedback</h2>
      </li>
      {feedback[person.id]?.map((fb: any) => (
        <li className={styles.feedbackItem} key={fb.id}>
          <p>{handleRenderQuestion(fb.id)}</p>
          {fb.type === 'scale' ? (
            <div className={styles.scale}>
              <div className={styles.scaleOff}>
                {[...Array(10)].map(() => (
                  <span />
                ))}
              </div>
              <div className={styles.scaleOn}>
                {[...Array(fb.answer)].map(() => (
                  <span />
                ))}
              </div>
            </div>
          ) : (
            <div>
              {fb.answer ? (
                fb.answer
              ) : (
                <span className={styles.skipped}>skipped</span>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default FeedbackResults
