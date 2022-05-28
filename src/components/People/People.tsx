import * as React from 'react'
import styles from './people.module.css'
import classnames from 'classnames'
import User from '../../components/User'

type Props = {
  people: any
  handleSelectPerson: any
  person: any
}

const People = (props: Props) => {
  const { people, person, handleSelectPerson } = props

  return (
    <ul className={styles.users}>
      <li>
        <h4 style={{ color: 'var(--darkGray)', marginBottom: 0 }}>
          Feedback given
        </h4>
      </li>
      {people.map((user: any) => (
        <li
          key={user.id}
          className={classnames(styles.user, {
            [styles.active]: person?.id === user.id,
          })}
          onClick={() => handleSelectPerson(user)}
        >
          <User name={user.name} avatarUrl={user.avatarUrl} />
        </li>
      ))}
    </ul>
  )
}

export default People
