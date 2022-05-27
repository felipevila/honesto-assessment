import * as React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

const RouteTyped = Route as any
const RedirectTyped = Redirect as any
interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component?: any
  // tslint:disable-next-line:no-any
  children?: any
  isLoggedIn: boolean
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, children, ...rest } = props

  return (
    <RouteTyped
      {...rest}
      render={(routeProps: any) =>
        props.isLoggedIn ? (
          Component ? (
            <Component {...routeProps} />
          ) : (
            children
          )
        ) : (
          <RedirectTyped
            to={{
              pathname: '/',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
