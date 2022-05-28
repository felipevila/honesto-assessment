import * as React from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../context/UserProvider'
import { FeedbackContext } from '../../context/FeedbackProvider'
import { AccountContext } from '../../context/AccountProvider'
import { QuestionContext } from '../../context/QuestionProvider'
import MainLayout from '../../layouts/MainLayout'
import styles from './reviewFeedback.module.css'
import NoContent from '../../components/NoContent'
import FeedbackResults from '../../components/FeedbackResults'
import People from '../../components/People'

const ReviewFeedback = () => {
  const { defaultId } = useParams<{ defaultId: string | undefined }>()

  const users = React.useContext(UserContext)
  const { feedback } = React.useContext(FeedbackContext)
  const questions = React.useContext(QuestionContext) || []
  const currentUser = React.useContext(AccountContext)

  const [person, setPerson] = React.useState<any>({
    avatarUrl: '',
    id: defaultId,
    name:
      users && defaultId
        ? users.filter((user) => user.id === defaultId)[0].name
        : '',
  })

  const selectPerson = (person: any) => {
    setPerson(person)
  }

  const renderQuestionLabel = (feedbackId: string) => {
    return questions.filter((q) => q.id === feedbackId)[0].label
  }

  const feedbackUsers: any =
    users &&
    users
      .filter((user) => user.id !== currentUser?.id)
      .filter((user) => user.finished)

  React.useEffect(() => {
    if (users && feedback) {
      if (!person) setPerson(feedbackUsers[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, feedback, person])

  return (
    <MainLayout loggedIn>
      {feedbackUsers?.length > 0 ? (
        <>
          <h1>My Feedback</h1>
          <div className={styles.wrapper}>
            {feedbackUsers && feedbackUsers.length > 0 && (
              <People
                people={feedbackUsers}
                handleSelectPerson={selectPerson}
                person={person}
              />
            )}
            {person && (
              <FeedbackResults
                feedback={feedback}
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

export default ReviewFeedback
