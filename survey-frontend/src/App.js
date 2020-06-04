import React, { useEffect  } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { initializeSurveys } from './reducers/surveyReducer'
import Survey from './components/Survey'
import Surveys from './components/Surveys'

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
        </Route>
      </Switch>
    </div>
  )
}

export default App
