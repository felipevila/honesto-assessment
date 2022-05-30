import * as React from 'react'
import { UserT } from './types'

type DispatchUserContextT = any

export const DispatchUserContext =
  React.createContext<DispatchUserContextT | null>(null)
export const UserContext = React.createContext<UserT[] | null>(null)

type SetUsersT = {
  action: 'set'
  payload: UserT[] | any
}

const reducer = (state: any, update: SetUsersT): UserT[] | null => {
  if (update.action === 'set') {
    return update.payload
  }
  if (update.action === 'finish') {
    const stateWithEvaluators = [
      ...state,
      state.forEach((item: UserT) => {
        item.evaluators = item.evaluators ? [...item.evaluators] : []
      }),
    ].filter((item) => item !== undefined)

    const evaluatedIndex = parseInt(update.payload.person.replace(/\D/g, ''))
    const evaluated = stateWithEvaluators[evaluatedIndex]

    if (evaluated) {
      evaluated.evaluators = [...evaluated.evaluators, update.payload.evaluator]
    }
    return stateWithEvaluators
  }

  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = React.useReducer(reducer, [])

  console.log('users', state)

  return (
    <DispatchUserContext.Provider value={dispatch}>
      <UserContext.Provider value={state}>{children}</UserContext.Provider>
    </DispatchUserContext.Provider>
  )
}

export default UIProvider
