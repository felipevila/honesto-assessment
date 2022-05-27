import * as React from 'react'
import { UserT } from './types'

type DispatchAccountContextT = any

export const DispatchAccountContext =
  React.createContext<DispatchAccountContextT | null>(null)
export const AccountContext = React.createContext<UserT | null>(null)

type LoginAccountT = {
  action: 'login'
  payload: UserT
}

type LogoutAccountT = {
  action: 'logout'
}

const reducer = (
  state: UserT | null,
  update: LoginAccountT | LogoutAccountT,
): UserT | null => {
  if (update.action === 'login') {
    console.log('login ', state)
    return update.payload
  } else if (update.action === 'logout') {
    console.log('logout')
    return null
  }
  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = React.useReducer(reducer, null)

  console.log('account', state)

  return (
    <DispatchAccountContext.Provider value={dispatch}>
      <AccountContext.Provider value={state}>
        {children}
      </AccountContext.Provider>
    </DispatchAccountContext.Provider>
  )
}

export default UIProvider
