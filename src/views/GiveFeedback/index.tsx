import * as React from 'react'
import { UserContext } from '../../context/UserProvider'
import { useHistory } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import User from '../../components/User'
import Button from '../../components/Button'
import styles from './giveFeedback.module.css'
import { slugify } from '../../utils/helpers'

const GiveFeedback = () => {
  const users = React.useContext(UserContext)
  const history = useHistory()

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <h1>Share Feedback</h1>
        {users && users.length > 0 && (
          <ul className={styles.users}>
            {users.map((user) => (
              <li key={user.id} className={styles.user}>
                <User name={user.name} avatarUrl={user.avatarUrl} />
                <span style={{ flex: 1 }} />
                <Button
                  onClick={() => {
                    history.push(`share-feedback/${slugify(user.name)}/q1`)
                  }}
                >
                  Fill out
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  )
}

export default GiveFeedback
