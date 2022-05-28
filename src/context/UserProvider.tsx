import * as React from 'react'
import { UserT } from './types'

type DispatchUserContextT = any

export const DispatchUserContext =
  React.createContext<DispatchUserContextT | null>(null)
export const UserContext = React.createContext<UserT[] | null>(null)

type SetUsersT = {
  action: 'set'
  payload: UserT[]
}

const reducer = (state: any, update: SetUsersT): UserT[] | null => {
  if (update.action === 'set') {
    return update.payload
  }
  if (update.action === 'finish') {
    let newState = state?.filter((u: any) => u.id === update.payload)[0]
    if (newState) newState.finished = true
    return [...state]
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
