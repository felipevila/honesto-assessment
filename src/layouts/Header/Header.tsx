import { NavLink } from 'react-router-dom'
import styles from './header.module.css'
import * as React from 'react'
import {
  AccountContext,
  DispatchAccountContext,
} from '../../context/AccountProvider'
import Avatar from '../../components/Avatar'

const Header = () => {
  const currentUser = React.useContext(AccountContext)
  const logoutUser = React.useContext(DispatchAccountContext)

  const handleLogout = () => {
    logoutUser({ action: 'logout' })
  }

  return (
    <div className={styles.header}>
      <h1>Honesto</h1>
      <NavLink exact to="/share-feedback" activeClassName={styles.active}>
        Share Feedback
      </NavLink>
      <NavLink exact to="/my-feedback" activeClassName={styles.active}>
        My Feedback
      </NavLink>
      <NavLink exact to="/components" activeClassName={styles.active}>
        Components
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
