import * as React from 'react'
import styles from './user.module.css'
import Avatar from '../Avatar'

type Props = {
  name: string
  avatarUrl?: string
}

const User = (props: Props) => {
  return (
    <div className={styles.user}>
      <Avatar {...props} />
      {props.name}
    </div>
  )
}

export default User
