import styles from './button.module.css'
import * as React from 'react'

type Props = {
  onClick: (se: React.SyntheticEvent) => void
  text?: string
  icon: React.ReactNode
}

const IconButton = (props: Props) => {
  const { text, icon, onClick } = props

  return (
    <button className={styles.button} onClick={onClick}>
      {icon}
      <span className={styles.text}>{text}</span>
    </button>
  )
}

export default IconButton
