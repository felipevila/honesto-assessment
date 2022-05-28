import React, { createContext, useReducer } from 'react'
import { SetFeedbackT, DispatchFeedbackContextT } from './types'

const initialState: any = {
  feedback: {},
}

const reducer = (state: any, action: SetFeedbackT) => {
  switch (action.type) {
    case 'set_initial':
      return {
        feedback: action.payload,
      }

    case 'set':
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
    default:
      return state
  }
}

export const DispatchFeedbackContext =
  React.createContext<DispatchFeedbackContextT | null>(null)
export const FeedbackContext = createContext(initialState)

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = useReducer(reducer, initialState)

  function setInitialFeedback(item: any) {
    dispatch({
      type: 'set_initial',
      payload: item,
    })
  }
  function setFeedback(item: any) {
    dispatch({
      type: 'set',
      payload: item,
    })
  }

  console.log('feedback', state)

  return (
    <DispatchFeedbackContext.Provider value={dispatch}>
      <FeedbackContext.Provider
        value={{
          feedback: state.feedback,
          setInitialFeedback,
          setFeedback,
        }}
      >
        {children}
      </FeedbackContext.Provider>
    </DispatchFeedbackContext.Provider>
  )
}

export default UIProvider
