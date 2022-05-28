import React, { createContext, useReducer } from 'react'

const initialState: any = {
  feedback: {},
}

export type FeedbackTypeT = 'text' | 'multipleChoice' | 'scale'

export type FeedbackT = {
  id: string
  type: FeedbackTypeT
  answer: string | number
  evaluator: string
  evaluated: string
}

type SetFeedbackT = {
  type: string
  payload: any
}

const reducer = (state: any, action: SetFeedbackT) => {
  switch (action.type) {
    case 'SET_INITIAL_FEEDBACK':
      return {
        feedback: action.payload,
      }

    case 'SET_FEEDBACK':
      const { id, evaluated } = action.payload
      const questionIdx = state.feedback[evaluated].findIndex(
        (q: any) => q.id === id,
      )
      return {
        feedback: {
          ...state.feedback,
          [evaluated]: [
            ...state.feedback[evaluated].filter((p: any) => p.id !== id),
            (state.feedback[evaluated][questionIdx] = action.payload),
          ],
        },
      }
    case 'ADD_ITEM':
      return {
        feedback: [action.payload, ...state.feedback],
      }
    case 'REMOVE_ITEM':
      return {
        feedback: state.feedback.filter((item: any) => item !== action.payload),
      }
    default:
      return state
  }
}

export const FeedbackContext = createContext(initialState)

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = useReducer(reducer, initialState)

  function setInitialFeedback(item: any) {
    dispatch({
      type: 'SET_INITIAL_FEEDBACK',
      payload: item,
    })
  }
  function setFeedback(item: any) {
    dispatch({
      type: 'SET_FEEDBACK',
      payload: item,
    })
  }
  function addItemToList(item: any) {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    })
  }
  function removeItemFromList(item: any) {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: item,
    })
  }

  console.log('feedback', state)

  return (
    <FeedbackContext.Provider
      value={{
        feedback: state.feedback,
        addItemToList,
        removeItemFromList,
        setInitialFeedback,
        setFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default UIProvider
