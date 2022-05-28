import * as React from 'react'
import styles from './avatar.module.css'

type Props = {
  avatarUrl?: string
  name: string
}

const Avatar = (props: Props) => {
  const { avatarUrl, name } = props
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
  return (
    <>
      {avatarUrl ? (
        <img className={styles.avatar} alt={name} src={avatarUrl} />
      ) : (
        <span className={styles.initials}>{initials}</span>
      )}
    </>
  )
}

export default Avatar
