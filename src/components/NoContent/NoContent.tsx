import * as React from 'react'
import Button from '../Button'
import styles from './noContent.module.css'
import { useHistory } from 'react-router-dom'

type Props = {
  title: string
  text?: string
  small?: string
  returnHome?: boolean
}

const NoContent = (props: Props) => {
  const { title, text, small, returnHome } = props
  const history = useHistory()
  const handleBackToFeedback = () => {
    history.push('/share-feedback')
  }

  return (
    <div className={styles.wrapper}>
      {small && <small>{small}</small>}
      <h1>{title}</h1>
      {text && <p>{text}</p>}
      {returnHome && (
        <>
          <br />
          <Button onClick={handleBackToFeedback}>Back to Share Feedback</Button>
        </>
      )}
    </div>
  )
}

export default NoContent
