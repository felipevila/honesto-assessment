import React, { useState } from 'react'
import styles from './question.module.css'
import classnames from 'classnames'
import Rating from '../Rating'

interface IOption {
  label: string
  value: number
}

type Props = {
  id: string
  label: string
  required: boolean
  type: 'text' | 'multipleChoice' | 'scale'
  options?: IOption[]
}

const Question = (props: Props) => {
  const { type, options } = props
  const [feedback, setFeedback] = useState<number>(0)
  const [hover, setHover] = useState(0)

  const selectOption = (option: IOption) => {
    setFeedback(option.value)
  }

  const handleTextFeedback = (e: any) => {
    setFeedback(e.target.value)
  }

  if (type === 'multipleChoice') {
    return (
      <ul className={styles.options}>
        {options?.map((option) => {
          return (
            <li
              key={option.value}
              className={classnames(styles.option, {
                [styles.active]: feedback === option.value,
              })}
              onClick={() => selectOption(option)}
            >
              {option.label}
            </li>
          )
        })}
      </ul>
    )
  }
  if (type === 'text') {
    return (
      <textarea
        className={styles.text}
        placeholder="Put something here"
        onChange={handleTextFeedback}
      />
    )
  }
  return (
    <Rating
      hover={hover}
      setHover={setHover}
      feedback={feedback}
      setFeedback={setFeedback}
    />
  )
}

export default Question
