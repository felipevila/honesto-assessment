import * as React from 'react'
import { QuestionContext } from '../../context/QuestionProvider'
import { UserContext, DispatchUserContext } from '../../context/UserProvider'
import { FeedbackContext } from '../../context/FeedbackProvider'
import { AccountContext } from '../../context/AccountProvider'
import { IAnswer, IOption, FeedbackTypeT } from '../../context/types'
import { useHistory, useParams } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import IconButton from '../../components/IconButton'
import Button from '../../components/Button'
import Avatar from '../../components/Avatar'
import Question from '../../components/Question'
import styles from './enterFeedback.module.css'
import { ReactComponent as Back } from '../../assets/back.svg'
import { unslugify } from '../../common/helpers'

const Feedback = () => {
  const history = useHistory()
  const { user, question } = useParams<{ user: string; question: string }>()

  const questions = React.useContext(QuestionContext) || []
  const users = React.useContext(UserContext)
  const currentUser = React.useContext(AccountContext)
  const { setFeedback } = React.useContext(FeedbackContext)
  const userDispatch = React.useContext(DispatchUserContext)

  const answerInitial: IAnswer = { type: '', value: '' }
  const [answer, setAnswer] = React.useState<IAnswer>(answerInitial)
  const [selected, setSelected] = React.useState<number>(0)
  const page = parseInt(question.replace(/^\D+/g, ''))

  const currentQuestion = questions?.filter((q) => q.id === question)[0]
  const person = users?.filter((u) => u.name === unslugify(user))[0]

  const { label, required, id: questionId } = currentQuestion
  const isLastQuestion = question === `q${questions?.length}`

  const navigate = (direction: string) => {
    setSelected(0)
    setAnswer(answerInitial)
    if (isLastQuestion && direction === 'next') {
      if (currentUser) {
        userDispatch({
          action: 'finish',
          payload: { person: person?.id, evaluator: currentUser.id },
        })
      }
      history.push(`/`)
    } else {
      history.push(
        `/share-feedback/${user}/q${
          direction === 'next' ? page + 1 : page - 1
        }`,
      )
    }
  }

  const progressBarWidth = ((page - 1) / questions.length) * 100

  const handleChangeText = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setAnswer({ type: 'text', value: (e.target as HTMLTextAreaElement).value })
  }

  const handleClickOption = (type: FeedbackTypeT, option: IOption) => {
    setSelected(option.value)
    setAnswer({ type, value: option.label })
  }

  const handleClickScale = (type: FeedbackTypeT, value: number) => {
    setSelected(value)
    setAnswer({ type, value })
  }

  const handleSubmitQuestion = () => {
    navigate('next')
    setFeedback({
      id: questionId,
      type: answer.type,
      answer: answer.value,
      evaluator: currentUser?.id,
      evaluated: person?.id,
    })
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
            <Question
              {...currentQuestion}
              handleText={handleChangeText}
              handleMultiple={handleClickOption}
              handleScale={handleClickScale}
              optionSelected={selected}
            />
            <nav>
              <Button
                onClick={() => navigate('previous')}
                disabled={page === 1}
              >
                Previous
              </Button>
              {!isLastQuestion && (
                <Button
                  disabled={required || isLastQuestion}
                  secondary
                  onClick={handleSubmitQuestion}
                >
                  Skip
                </Button>
              )}
              <Button
                onClick={handleSubmitQuestion}
                disabled={required && !answer.value}
              >
                Next
              </Button>
            </nav>
            <div
              className={styles.progressBar}
              style={{ width: `${progressBarWidth}%` }}
            ></div>
            <h4 style={{ color: `var(--copyColor)` }}>Questions Completed</h4>
            <p>
              {page - 1}/{questions.length}
            </p>
          </section>
        </>
      </div>
    </MainLayout>
  )
}

export default Feedback
