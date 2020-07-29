import React, { useEffect  } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import { Button, Container } from 'semantic-ui-react'

import { initializeSurveys } from './reducers/surveyReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeQuizzes } from './reducers/quizReducer'
import { login } from './reducers/userReducer'
import storage from './utils/storage'

import AppHeader from './components/AppHeader'
import NewSurvey from './components/NewSurvey/NewSurvey'
import NewUser from './components/NewUser/NewUser'
import NewQuiz from './components/NewQuiz/NewQuiz'
import UserSurveys from './components/UserSurveys'
import Survey from './components/Survey/Survey'
import Surveys from './components/Surveys'
import SurveyResults from './components/SurveyResults'
import Login from './components/Login/Login'
import Quizzes from './components/Quizzes'
import Quiz from './components/Quiz/Quiz'
import QuizResults from './components/QuizResults'
import EditSurvey from './components/EditSurvey/EditSurvey'
import EditQuiz from './components/EditQuiz/EditQuiz'
import EditUser from './components/EditUser/EditUser'
import AppFooter from './components/AppFooter'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeSurveys())
    dispatch(initializeQuizzes())
    dispatch(initializeUsers())
    const user = storage.loadUser()
    if (user) {
      dispatch(login(user))
    }
  }, [dispatch])

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
          <Route path="/quizzes/:id/edit">
            <EditQuiz />
          </Route>
          <Route path="/surveys/:id/edit">
            <EditSurvey />
          </Route>
          <Route path="/surveys/:id/results">
            <SurveyResults />
          </Route>
          <Route path="/quizzes/:id/results">
            <QuizResults />
          </Route>
          <Route path="/surveys/new">
            <NewSurvey />
          </Route>
          <Route path="/quizzes/new">
            <NewQuiz />
          </Route>
          <Route path="/surveys/:id">
            <Survey />
          </Route>
          <Route path="/quizzes/:id">
            <Quiz />
          </Route>
          <Route path="/profile">
            <EditUser />
          </Route>
          <Route path="/surveys">
            <UserSurveys />
          </Route>
          <Route path="/quizzes">
            <AppHeader />
            <Quizzes />
            <Button className='teal-button' color='teal' style={{marginTop: '10px', marginBottom: '10px'}} as={Link} to={'/quizzes/new'} floated='left'>Create a new quiz</Button>
          </Route>
          <Route path="/">
            <AppHeader />
            <Surveys />
            <Button className='teal-button' color='teal' style={{marginTop: '10px', marginBottom: '10px'}} as={Link} to={'/surveys/new'} floated='left'>Create a new survey</Button>
          </Route>
        </Switch>
        <AppFooter />
      </Container>
    </div>
  )
}

export default App
