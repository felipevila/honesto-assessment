import React from 'react'
import styles from './rating.module.css'
import { FeedbackTypeT } from '../../context/FeedbackProvider'

type Props = {
  hover: number
  setHover: (num: number) => void
  selected: number
  handleScale: (type: FeedbackTypeT, num: number) => void
}

const Rating = (props: Props) => {
  const { hover, setHover, selected, handleScale } = props
  return (
    <>
      <div className={styles.rating}>
        {[...Array(10)].map((item, index) => {
          index += 1
          return (
            <button
              type="button"
              key={index}
              onClick={() => handleScale('scale', index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(selected)}
            >
              <div
                className={
                  index <= (hover || selected) ? styles.full : styles.empty
                }
              />
            </button>
          )
        })}
      </div>
      <div className={styles.counter}>{hover}/10</div>
    </>
  )
}

export default Rating
