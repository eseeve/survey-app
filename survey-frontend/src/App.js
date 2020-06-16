import React, { useEffect  } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'

import { initializeSurveys } from './reducers/surveyReducer'
import NewSurvey from './components/NewSurvey/NewSurvey'
import Notification from './components/Notification'
import Survey from './components/Survey/Survey'
import Surveys from './components/Surveys'
import Results from './components/Results'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeSurveys())
  }, [dispatch])

  return  (
    <div>
      <Switch>
        <Route path="/surveys/:id/results">
          <Results />
        </Route>
        <Route path="/surveys/new">
          <NewSurvey />
        </Route>
        <Route path="/surveys/:id">
          <Survey />
        </Route>
        <Route path="/">
          <h1>Surveys</h1>
          <Notification />
          <Surveys />
          <Link to={'/surveys/new'}>Create a new survey</Link>
        </Route>
      </Switch>
    </div>
  )
}

export default App
