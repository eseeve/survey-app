import React, { useEffect  } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { initializeSurveys } from './reducers/surveyReducer'
import Survey from './components/Survey'
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
        <Route path="/surveys/:id">
          <Survey />
        </Route>
        <Route path="/">
          <h1>Surveys</h1>
          <Surveys />
          <h2>Create new survey</h2>
          <NewSurvey />
        </Route>
      </Switch>
    </div>
  )
}

export default App
