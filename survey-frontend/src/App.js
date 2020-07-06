import React, { useEffect  } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import { Button, Container, Header, Grid } from 'semantic-ui-react'

import { setNotification } from './reducers/notificationReducer'
import { initializeSurveys } from './reducers/surveyReducer'
import { initializeUsers } from './reducers/usersReducer'
import { login, logout } from './reducers/userReducer'
import storage from './utils/storage'

import NewSurvey from './components/NewSurvey/NewSurvey'
import NewUser from './components/NewUser/NewUser'
import Notification from './components/Notification'
import UserSurveys from './components/UserSurveys'
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
    const user = storage.loadUser()
    if (user) {
      dispatch(login(user))
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setNotification('You have logged out.', 5))
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <Container>
        <Switch>
          <Route path="/signup">
            <NewUser />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
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
          <Route path="/surveys">
            <UserSurveys />
          </Route>
          <Route path="/">
            <Grid style={{marginTop: '10px', marginBottom: '10px'}} columns={2}>
              <Grid.Column >
                <Header as='h1' >Survey App</Header>
              </Grid.Column>
              <Grid.Column >
                <Button floated='right' primary size='small' type='button' onClick={handleLogout} >
                  Logout
                </Button>
                <Button id='my-surveys' primary floated='right' size='small' basic as={Link} to={'/surveys'}>
                  My Surveys
                </Button>
              </Grid.Column>
            </Grid>
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
