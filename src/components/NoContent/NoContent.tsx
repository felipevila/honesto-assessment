import * as React from 'react'
import styles from './noContent.module.css'

type Props = {
  title: string
  text: string
}

const NoContent = (props: Props) => {
  const { title, text } = props

  return (
    <div className={styles.wrapper}>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  )
}

export default NoContent
