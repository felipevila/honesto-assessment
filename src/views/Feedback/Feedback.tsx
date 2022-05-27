import * as React from 'react'
import { QuestionContext } from '../../context/QuestionProvider'
import { UserContext } from '../../context/UserProvider'
import { useHistory, useParams } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import IconButton from '../../components/IconButton'
import Button from '../../components/Button'
import Avatar from '../../components/Avatar'
import Question from '../../components/Question'
import styles from './feedback.module.css'
import { ReactComponent as Back } from '../../assets/back.svg'
import { unslugify } from '../../utils/helpers'

const Feedback = () => {
  const questions = React.useContext(QuestionContext) || []
  const users = React.useContext(UserContext)
  const history = useHistory()
  const { user, question } = useParams<{ user: string; question: string }>()
  const page = parseInt(question.replace(/^\D+/g, ''))

  const currentQuestion = questions?.filter((q) => q.id === question)[0]
  const person = users?.filter((u) => u.name === unslugify(user))[0]

  const { label, required } = currentQuestion
  const isLastQuestion = question === `q${questions?.length - 1}`

  const navigate = (direction: string) => {
    history.push(
      `/share-feedback/${user}/q${direction === 'next' ? page + 1 : page - 1}`,
    )
  }
  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <IconButton
          icon={<Back />}
          text="Back"
          onClick={() => {
            history.push('/share-feedback')
          }}
        />
        <>
          {person && (
            <section className={styles.summary}>
              <hgroup>
                <h1>{label}</h1>
                <h4>share your feedback for {person.name}</h4>
              </hgroup>
              <Avatar {...person} />
            </section>
          )}
          <section className={styles.question}>
            <Question {...currentQuestion} />
            <nav>
              <Button
                onClick={() => navigate('previous')}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                disabled={required || isLastQuestion}
                secondary
                onClick={() => navigate('next')}
              >
                Skip
              </Button>
              <Button
                onClick={() => navigate('next')}
                disabled={isLastQuestion}
              >
                Next
              </Button>
            </nav>
            <div className={styles.progressBar}></div>
            <h3>Questions Completed</h3>
            <p>1/9</p>
          </section>
        </>
      </div>
    </MainLayout>
  )
}

export default Feedback
