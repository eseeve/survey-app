import React, { useEffect  } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import { Button, Container, Header } from 'semantic-ui-react'

import { initializeSurveys } from './reducers/surveyReducer'
import { initializeUsers } from './reducers/usersReducer'
import storage from './utils/storage'

import NewSurvey from './components/NewSurvey/NewSurvey'
import Notification from './components/Notification'
import Survey from './components/Survey/Survey'
import Surveys from './components/Surveys'
import Results from './components/Results'
import Login from './components/Login/Login'

const App = () => {
  const user = useSelector(state =>  state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeSurveys())
    dispatch(initializeUsers())
  }, [dispatch])

  if ( !user ) {
    return (
      <Container>
        <Login />
      </Container>
    )
  }

  return  (
    <div>
      <Container>
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
            <Header as='h1' style={{marginTop: '10px'}}>Survey App</Header>
            <Notification />
            <Surveys />
            <Button style={{marginTop: '10px'}} primary as={Link} to={'/surveys/new'} floated='left'>Create a new survey</Button>
          </Route>
        </Switch>
      </Container>
    </div>
  )
}

export default App
