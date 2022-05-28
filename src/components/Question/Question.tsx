import React from 'react'
import styles from './question.module.css'
import classnames from 'classnames'
import Rating from '../Rating'
import { FeedbackTypeT } from '../../context/FeedbackProvider'
import { IOption } from '../../views/Feedback/Feedback'

type Props = {
  id: string
  label: string
  required: boolean
  type: FeedbackTypeT
  options?: IOption[]
  handleText: (e: any, type: FeedbackTypeT) => void
  handleMultiple: (type: FeedbackTypeT, value: IOption) => void
  handleScale: (type: FeedbackTypeT, value: number) => void
  optionSelected: number
}

const Question = (props: Props) => {
  const { type, options, optionSelected, handleScale } = props
  const [hover, setHover] = React.useState(0)

  if (type === 'multipleChoice') {
    return (
      <ul className={styles.options}>
        {options?.map((option) => (
          <li
            key={option.value}
            className={classnames(styles.option, {
              [styles.active]: optionSelected === option.value,
            })}
            onClick={() => props.handleMultiple(type, option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    )
  }
  if (type === 'text') {
    return (
      <textarea
        className={styles.text}
        placeholder="Put something here"
        onChange={(e) => props.handleText(e, type)}
      />
    )
  }
  return (
    <Rating
      hover={hover}
      setHover={setHover}
      selected={optionSelected}
      handleScale={handleScale}
    />
  )
}

export default Question
