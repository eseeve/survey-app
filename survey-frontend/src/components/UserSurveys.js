import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Segment, Grid, Button, Header } from 'semantic-ui-react'

import Menu from './Menu'
import Notification from './Notification'
import storage from '../utils/storage'

import { logout } from '../reducers/userReducer'
import { removeUser } from '../reducers/usersReducer'
import { removeSurvey } from '../reducers/surveyReducer'
import { setNotification } from '../reducers/notificationReducer'
import { removeQuiz } from '../reducers/quizReducer'

const UserSurveys = () => {
  const allSurveys = useSelector(state => state.surveys)
  const allQuizzes = useSelector(state => state.quizzes)
  const users = useSelector(state => state.users)
  const user = useSelector(state => state.user)
  const dispatch  = useDispatch()
  const history = useHistory()

  const handleRemoveSurvey = (event, survey) => {
    event.preventDefault()
    const ok = window.confirm(`Delete survey ${survey.name}?`)
    if (ok) {
      dispatch(removeSurvey(survey))
      dispatch(setNotification(`Survey '${survey.name}' deleted.`, 5))
    }
  }

  const handleRemoveQuiz = (event, quiz) => {
    event.preventDefault()
    const ok = window.confirm(`Delete quiz ${quiz.name}?`)
    if (ok) {
      dispatch(removeQuiz(quiz))
      dispatch(setNotification(`Quiz '${quiz.name}' deleted.`, 5))
    }
  }

  const handleRemoveUser = () => {
    const ok = window.confirm(
      `Are you sure you want to delete your account? All your surveys will be also deleted. This action is permanent!`
    )
    if (ok) {
      try {
        const userToDelete = users.find(u => u.username === user.username)
        if (userToDelete) {
          allSurveys.forEach(s => {
            if (s.user.id === userToDelete.id) {
              dispatch(removeSurvey(s))
            }
          })
          allQuizzes.forEach(q => {
            if (q.user.id === userToDelete.id) {
              dispatch(removeQuiz(q))
            }
          })
          dispatch(removeUser(userToDelete))
          dispatch(setNotification(`Your account '${user.username}' and your surveys have been deleted.`, 5))
          dispatch(logout())
          storage.logoutUser()
          history.push('/')
        } else {
          throw 'User not found' //eslint-disable-line
        }
      } catch (e) {
        dispatch(setNotification('Something went wrong', 5, 'error')) 
      }
    }
  }

  const handleCopyLinkSurvey = (event, survey) => {
    event.preventDefault()
    navigator.clipboard.writeText(window.location.href.concat(`/${survey.id}`))
    dispatch(setNotification(`Link to '${survey.name}' copied to clipboard!`, 5))                 
  }

  const handleCopyLinkQuiz = (event, quiz) => {
    event.preventDefault()
    navigator.clipboard.writeText(window.location.href.slice(0, window.location.href.length-7).concat(`quizzes/${quiz.id}`))
      dispatch(setNotification(`Link to '${quiz.name}' copied to clipboard!`, 5))                 
  }

  if (!allSurveys && !allQuizzes) {
    return null
  }

  const surveys = allSurveys.filter(s => s.user.username === user.username)
  const quizzes = allQuizzes.filter(q => q.user.username === user.username)

  return(
    <div>
      <Grid style={{paddingTop: '10px', marginBottom: '10px'}} columns='equal'>
        <Grid.Column width={14}>
          <Header as='h1' >Surveys by {user.name}</Header>
        </Grid.Column>
        <Grid.Column style={{marginTop: '5px'}}>
          <Menu link='Home' />
        </Grid.Column>
      </Grid>
      <Notification />
      <Header as='h2'>Surveys</Header>
      {
        surveys.length === 0 ? <div style={{marginBottom: '10px'}}>You have no surveys.</div> :
        <Segment.Group>
        {surveys.map(survey =>
            <Segment key={survey.id} >
              {survey.name}
              <Button className='red-button' floated='right' color='red' size='small' onClick={(event) => handleRemoveSurvey(event, survey)}>Delete Survey</Button>
              <Button style={{marginRight: '10px'}} floated='right' size='small' onClick={(event) => handleCopyLinkSurvey(event, survey)}>Copy link</Button>
              <div>Responses: {survey.answers}</div>
              <div style={{marginTop: '3px'}}><Link id='results' className='link' to={`/surveys/${survey.id}/results`}>View results</Link></div>
            </Segment>
          )}
        </Segment.Group>
      }
      <Header as='h2'>Quizzes</Header>
      {
        quizzes.length === 0 ? <div style={{marginBottom: '10px'}}>You have no quizzes.</div> :
        <Segment.Group>
        {quizzes.map(quiz =>
            <Segment key={quiz.id} >
              {quiz.name}
              <Button className='red-button' floated='right' color='red' size='small' onClick={(event) => handleRemoveQuiz(event, quiz)}>Delete Quiz</Button>
              <Button style={{marginRight: '10px'}} floated='right' size='small' onClick={(event) => handleCopyLinkQuiz(event, quiz)}>Copy link</Button>
              <div>Responses: {quiz.answers}</div>
              <div style={{marginTop: '3px'}}><Link id='results' className='link' to={`/quizzes/${quiz.id}/results`}>View results</Link></div>
            </Segment>
          )}
        </Segment.Group>
      }
      <Button className='red-button' id='delete-account' color='red' size='small' onClick={handleRemoveUser}>Delete Your Account</Button>
    </div>
  )
}

export default UserSurveys
