import { NavLink } from 'react-router-dom'
import styles from './header.module.css'
import * as React from 'react'
import {
  AccountContext,
  DispatchAccountContext,
} from '../../context/AccountProvider'
import { UserContext } from '../../context/UserProvider'
import Avatar from '../../components/Avatar'

const Header = () => {
  const currentUser = React.useContext(AccountContext)
  const logoutUser = React.useContext(DispatchAccountContext)
  const users = React.useContext(UserContext)

  const handleLogout = () => {
    logoutUser({ action: 'logout' })
  }

  const enteredFeedbackCount: number =
    (users &&
      users
        .filter((user) => user.id !== currentUser?.id)
        .filter((user) => user.evaluators?.includes(currentUser?.id)).length) ||
    0

  const receivedFeedbackCount = 0 // TODO: Count received feedback

  return (
    <div className={styles.header}>
      <h1>Honesto</h1>
      <NavLink exact to="/share-feedback" activeClassName={styles.active}>
        Share Feedback
      </NavLink>
      <NavLink
        exact
        to="/my-feedback/noDefaultID"
        activeClassName={styles.active}
      >
        My Feedback
        {enteredFeedbackCount > 0 && <span>{enteredFeedbackCount}</span>}
      </NavLink>
      <NavLink
        exact
        to="/team-feedback/noDefaultID"
        activeClassName={styles.active}
      >
        Team Feedback
        {receivedFeedbackCount > 0 && <span>{receivedFeedbackCount}</span>}
      </NavLink>
      <span className={styles.spacer} />
      {currentUser && (
        <NavLink exact to="/" onClick={handleLogout} className={styles.logOut}>
          <Avatar {...currentUser} />
          Logout {currentUser && `${currentUser.name}`}
        </NavLink>
      )}
    </div>
  )
}
export default Header
