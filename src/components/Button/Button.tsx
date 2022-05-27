import styles from './button.module.css'
import * as React from 'react'
import classnames from 'classnames'

type Props = {
  onClick: (se: React.SyntheticEvent) => void
  children: React.ReactNode
  secondary?: boolean
}

const Button = (props: Props) => {
  const { children, secondary, onClick } = props

  return (
    <button
      className={classnames(styles.button, {
        [styles.secondaryButton]: secondary,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
