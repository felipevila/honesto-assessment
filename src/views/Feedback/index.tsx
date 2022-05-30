import * as React from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../context/UserProvider'
import { FeedbackContext } from '../../context/FeedbackProvider'
import { AccountContext } from '../../context/AccountProvider'
import { QuestionContext } from '../../context/QuestionProvider'
import { UserT } from '../../context/types'
import MainLayout from '../../layouts/MainLayout'
import styles from './feedback.module.css'
import NoContent from '../../components/NoContent'
import FeedbackResults from '../../components/FeedbackResults'
import People from '../../components/People'

type Props = {
  isMyFeedback: boolean
}

const Feedback = (props: Props) => {
  const { isMyFeedback } = props
  const { defaultId } = useParams<{ defaultId: string }>()

  const users = React.useContext(UserContext) || []

  const [person, setPerson] = React.useState<UserT>({
    avatarUrl: '',
    id: defaultId,
    name:
      users && defaultId !== 'noDefaultID'
        ? users.filter((user) => user.id === defaultId)[0].name
        : '',
    evaluators: [],
  })
  const questions = React.useContext(QuestionContext) || []
  const currentUser = React.useContext(AccountContext) || person
  const { feedback } = React.useContext(FeedbackContext)

  const selectPerson = (person: UserT) => setPerson(person)

  const renderQuestionLabel = (feedbackId: string) => {
    return questions.filter((q) => q.id === feedbackId)[0].label
  }

  let teamFeedbackIds: string[] = []
  let processedFeedback = {}
  let feedbackUsers: UserT[] | null = []

  teamFeedbackIds = Object.keys(feedback).filter(
    (item) => !Array.isArray(feedback[item]),
  )
  teamFeedbackIds.forEach((item) => {
    processedFeedback = {
      ...processedFeedback,
      [item]: feedback[item],
    }
  })

  feedbackUsers = isMyFeedback
    ? users
        .filter((user) => user.id !== currentUser?.id)
        .filter((u) => u.evaluators?.includes(currentUser?.id))
    : users
        .filter((user) => user.id !== currentUser?.id)
        .filter((u) => teamFeedbackIds.includes(u.id))

  return (
    <MainLayout loggedIn>
      {feedbackUsers && feedbackUsers.length > 0 ? (
        <>
          <h1>{isMyFeedback ? 'My Feedback' : 'Feedback Received'}</h1>
          <div className={styles.wrapper}>
            <People
              title="Feedback given"
              people={feedbackUsers}
              handleSelectPerson={selectPerson}
              person={person}
            />
            {person && currentUser && (
              <FeedbackResults
                evaluator={currentUser.id}
                feedback={isMyFeedback ? feedback : processedFeedback}
                person={person}
                handleRenderQuestion={renderQuestionLabel}
              />
            )}
          </div>
        </>
      ) : (
        <NoContent
          title="No feedback to display 🔮"
          text="There is no feedback to display at this time – check back in a bit! "
        />
      )}
    </MainLayout>
  )
}

export default Feedback
