import * as React from 'react'
import { UserContext } from '../../context/UserProvider'
import { AccountContext } from '../../context/AccountProvider'
import { useHistory } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import User from '../../components/User'
import Button from '../../components/Button'
import styles from './shareFeedback.module.css'
import { slugify } from '../../common/helpers'

const ShareFeedback = () => {
  const users = React.useContext(UserContext)
  const currentUser = React.useContext(AccountContext)
  const history = useHistory()

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <h1>Share Feedback</h1>
        {users && users.length > 0 && (
          <ul className={styles.users}>
            {users
              .filter((user) => user.id !== currentUser?.id)
              .map((user) => (
                <li key={user.id} className={styles.user}>
                  <User name={user.name} avatarUrl={user.avatarUrl} />
                  <span style={{ flex: 1 }} />
                  {user.finished ? (
                    <Button
                      onClick={() => {
                        history.push(`my-feedback/${user.id}`)
                      }}
                      secondary
                    >
                      View Submissions
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        history.push(`share-feedback/${slugify(user.name)}/q1`)
                      }}
                    >
                      Fill out
                    </Button>
                  )}
                </li>
              ))}
          </ul>
        )}
      </div>
    </MainLayout>
  )
}

export default ShareFeedback
