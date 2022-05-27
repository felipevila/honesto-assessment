import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { DispatchUserContext } from '../context/UserProvider'
import { DispatchQuestionContext } from '../context/QuestionProvider'
import Components from '../views/Components'
import ErrorHandler from './ErrorHandler'
import GiveFeedback from '../views/GiveFeedback'
import Home from '../views/Home'
import http from '../common/http'
import NotFound from '../views/NotFound'
import ReviewFeedback from '../views/ReviewFeedback'
import { AccountContext } from '../context/AccountProvider'
import PrivateRoute from '../components/Routing/PrivateRoute'

const App = () => {
  const currentUser = React.useContext(AccountContext)
  const userDispatch = React.useContext(DispatchUserContext)
  const questionDispatch = React.useContext(DispatchQuestionContext)
  const isLoggedIn = currentUser != null

  React.useEffect(() => {
    Promise.all([http.get('questions'), http.get('people')]).then(
      ([questions, people]) => {
        userDispatch({
          action: 'set',
          payload: people,
        })

        questionDispatch({
          action: 'set',
          payload: questions,
        })
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BrowserRouter>
      <ErrorHandler>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute isLoggedIn={isLoggedIn} exact path="/my-feedback">
            <ReviewFeedback />
          </PrivateRoute>
          <PrivateRoute isLoggedIn={isLoggedIn} exact path="/share-feedback">
            <GiveFeedback />
          </PrivateRoute>
          <PrivateRoute isLoggedIn={isLoggedIn} exact path="/components">
            <Components />
          </PrivateRoute>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </ErrorHandler>
    </BrowserRouter>
  )
}

export default App
