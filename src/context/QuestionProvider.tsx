import * as React from 'react'

export type QuestionT = {
  id: string
  type: 'scale' | 'text'
  required: boolean
  label: string
}

export type Question2T = QuestionT & {
  type: 'multipleChoice'
  options: {
    label: string
    value: number
  }[]
}

type DispatchQuestionContextT = any

export const DispatchQuestionContext =
  React.createContext<DispatchQuestionContextT | null>(null)
export const QuestionContext = React.createContext<QuestionT[] | null>(null)

type SetQuestionsT = {
  action: 'set'
  payload: Array<QuestionT | Question2T>
}

const reducer = (
  state: QuestionT[] | null,
  update: SetQuestionsT,
): QuestionT[] | null => {
  if (update.action === 'set') {
    return update.payload
  }

  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = React.useReducer(reducer, [])
  console.log('questions', state)

  return (
    <DispatchQuestionContext.Provider value={dispatch}>
      <QuestionContext.Provider value={state}>
        {children}
      </QuestionContext.Provider>
    </DispatchQuestionContext.Provider>
  )
}

export default UIProvider
