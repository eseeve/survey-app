import React, { useEffect  } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'

import { initializeSurveys } from './reducers/surveyReducer'
import Survey from './components/Survey/Survey'
import Surveys from './components/Surveys'
import NewSurvey from './components/NewSurvey/NewSurvey'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeSurveys())
  }, [dispatch])

  return  (
    <div>
      <Switch>
        <Route path="/surveys/new">
          <NewSurvey />
        </Route>
        <Route path="/surveys/:id">
          <Survey />
        </Route>
        <Route path="/">
          <h1>Surveys</h1>
          <Surveys />
          <Link to={'/surveys/new'}>Create a new survey</Link>
        </Route>
      </Switch>
    </div>
  )
}

export default App
