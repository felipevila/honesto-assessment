import styles from './content.module.css'
import * as React from 'react'
import classnames from 'classnames'

type Props = {
  children: React.ReactNode
}

const Content = ({ children }: Props) => (
  <div className={classnames(styles.content)}>{children}</div>
)

export default Content
