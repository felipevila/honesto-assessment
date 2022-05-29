import styles from './feedbackResults.module.css'
import { UserT } from '../../context/types'
import * as React from 'react'

type Props = {
  person: UserT
  feedback: any
  handleRenderQuestion: (id: string) => React.ReactNode
}

const FeedbackResults = (props: Props) => {
  const { feedback, person, handleRenderQuestion } = props
  return (
    <ul className={styles.feedback}>
      <li>
        <h2>{person.name} Feedback</h2>
      </li>
      {person.id !== 'noDefaultID' ? (
        <>
          {feedback[person.id]?.map((fb: any) => (
            <li className={styles.feedbackItem} key={fb.id}>
              <p>{handleRenderQuestion(fb.id)}</p>
              {fb.type === 'scale' ? (
                <div className={styles.scale}>
                  <div className={styles.scaleOff}>
                    {[...Array(10)].map((i) => (
                      <span key={i} />
                    ))}
                  </div>
                  <div className={styles.scaleOn}>
                    {[...Array(fb.answer)].map((i) => (
                      <span key={i} />
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
        </>
      ) : (
        <li style={{ padding: '0 1rem' }}>
          ← Select a teammate to review their feedback
        </li>
      )}
    </ul>
  )
}

export default FeedbackResults
