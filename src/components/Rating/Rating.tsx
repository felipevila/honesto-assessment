import React from 'react'
import styles from './rating.module.css'

type Props = {
  hover: number
  setHover: (num: number) => void
  feedback: number
  setFeedback: (num: number) => void
}

const Rating = (props: Props) => {
  return (
    <>
      <div className={styles.rating}>
        {[...Array(10)].map((star, index) => {
          index += 1
          return (
            <button
              type="button"
              key={index}
              className={
                index <= (props.hover || props.feedback) ? 'on' : 'off'
              }
              onClick={() => props.setFeedback(index)}
              onMouseEnter={() => props.setHover(index)}
              onMouseLeave={() => props.setHover(props.feedback)}
            >
              <div
                className={
                  index <= (props.hover || props.feedback)
                    ? styles.full
                    : styles.empty
                }
              />
            </button>
          )
        })}
      </div>
      <div className={styles.counter}>{props.hover}/10</div>
    </>
  )
}

export default Rating
