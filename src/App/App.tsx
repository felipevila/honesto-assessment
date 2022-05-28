import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { DispatchUserContext } from '../context/UserProvider'
import {
  DispatchQuestionContext,
  QuestionT,
  Question2T,
} from '../context/QuestionProvider'
import { DispatchFeedbackContext } from '../context/FeedbackProvider'
import Components from '../views/Components'
import ErrorHandler from './ErrorHandler'
import GiveFeedback from '../views/GiveFeedback'
import Home from '../views/Home'
import http from '../common/http'
import NotFound from '../views/NotFound'
import ReviewFeedback from '../views/ReviewFeedback'
import Feedback from '../views/Feedback'
import { AccountContext } from '../context/AccountProvider'
import PrivateRoute from '../components/Routing/PrivateRoute'
import { UserT } from '../context/types'

const Router = BrowserRouter as any
const Error = ErrorHandler as any
const SwitchTyped = Switch as any
const RouteTyped = Route as any

const App = () => {
  const currentUser = React.useContext(AccountContext)
  const userDispatch = React.useContext(DispatchUserContext)
  const feedbackDispatch = React.useContext(DispatchFeedbackContext)
  const questionDispatch = React.useContext(DispatchQuestionContext)
  const isLoggedIn = currentUser != null

  React.useEffect(() => {
    let feedback = {}
    const feedbackPayload = (
      people: UserT[],
      questions: Array<QuestionT | Question2T>,
    ) => {
      people.forEach((user: any) => {
        feedback = {
          ...feedback,
          [user.id]: questions.map(({ id }: any) => {
            return { id, answer: '', evaluator: '', evaluated: '' }
          }),
        }
      })
      return feedback
    }
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

        feedbackDispatch({
          type: 'set_initial',
          payload: feedbackPayload(people, questions),
        })
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <Error>
        <SwitchTyped>
          <RouteTyped exact path="/">
            <Home />
          </RouteTyped>
          <PrivateRoute
            isLoggedIn={isLoggedIn}
            exact
            path="/my-feedback/:defaultId?"
          >
            <ReviewFeedback />
          </PrivateRoute>
          <PrivateRoute isLoggedIn={isLoggedIn} exact path="/share-feedback">
            <GiveFeedback />
          </PrivateRoute>
          <PrivateRoute
            isLoggedIn={isLoggedIn}
            exact
            path="/share-feedback/:user/:question"
          >
            <Feedback />
          </PrivateRoute>
          <PrivateRoute isLoggedIn={isLoggedIn} exact path="/components">
            <Components />
          </PrivateRoute>
          <RouteTyped>
            <NotFound />
          </RouteTyped>
        </SwitchTyped>
      </Error>
    </Router>
  )
}

export default App
