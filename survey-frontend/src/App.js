import React, { useEffect  } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { initializeSurveys, createSurvey } from './reducers/surveyReducer'
import Survey from './components/Survey'
import Surveys from './components/Surveys'
import NewSurvey from './components/NewSurvey/NewSurvey'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeSurveys())
  }, [dispatch])

  const handleSubmit = (values) => {
    console.log(values)
    values.questions.map(q => q.type = 'MultipleChoice')
    values.answers = 0
    values.questions.map(q => q.options.map(o => o.votes = 0))
    dispatch(createSurvey(values))
  }

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
          <NewSurvey onSubmit={handleSubmit} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
