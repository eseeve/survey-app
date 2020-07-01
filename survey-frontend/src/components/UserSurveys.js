import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Segment, Grid, Button, Header } from 'semantic-ui-react'

import Notification from './Notification'
import storage from '../utils/storage'

import { logout } from '../reducers/userReducer'
import { removeUser } from '../reducers/usersReducer'
import { removeSurvey } from '../reducers/surveyReducer'
import { setNotification } from '../reducers/notificationReducer'

const UserSurveys = () => {
  const allSurveys = useSelector(state => state.surveys)
  const dispatch  = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const history = useHistory()

  const handleRemoveSurvey = (event, survey) => {
    event.preventDefault()
    const ok = window.confirm(`Delete survey ${survey.name}?`)
    if (ok) {
      dispatch(removeSurvey(survey))
      dispatch(setNotification(`Survey '${survey.name}' deleted.`, 5))
    }
  }

  const handleRemoveUser = () => {
    const UserException = {
      name: 'UserException',
      message: 'User not found'
    }
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
          dispatch(removeUser(userToDelete))
          dispatch(setNotification(`Your account '${user.username}' and your surveys have been deleted.`, 5))
          dispatch(logout())
          storage.logoutUser()
          history.push('/')
        } else {
          throw new UserException()
        }
      } catch (e) {
        dispatch(setNotification('Something went wrong: ' + e.message, 5, 'error')) 
      }
    }
  }

  const handleClick = () => {
    history.push('/')
  }

  if (!allSurveys) {
    return null
  }

  const surveys = allSurveys.filter(s => s.user.username === user.username)

  return(
    <div>
      <Grid style={{marginTop: '10px', marginBottom: '10px'}} columns={2}>
        <Grid.Column >
          <Header as='h1' >Surveys by {user.name}</Header>
        </Grid.Column>
        <Grid.Column >
          <Button floated='right' primary size='small' type='button' onClick={handleClick} >
            Home
          </Button>
        </Grid.Column>
      </Grid>
      <Notification />
      {
        surveys.length === 0 ? <div>You have no surveys.</div> :
        <Segment.Group>
        {surveys.map(survey =>
            <Segment key={survey.id} >
              {survey.name}
              <Button floated='right' color='red' size='tiny' onClick={(event) => handleRemoveSurvey(event, survey)}>Delete Survey</Button>
              <div>Responses: {survey.answers}</div>
              <p style={{marginTop: '3px'}}><Link to={`/surveys/${survey.id}/results`}>View results</Link></p>
            </Segment>
          )}
        </Segment.Group>
      }
      <Button style={{marginTop: '20px', marginBottom: '10px'}} color='red' size='tiny' onClick={handleRemoveUser}>Delete Your Account</Button>
    </div>
  )
}

export default UserSurveys
