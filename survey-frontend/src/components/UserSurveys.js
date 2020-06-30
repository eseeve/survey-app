import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Segment, Grid, Button, Header } from 'semantic-ui-react'

import Notification from './Notification'

import { removeSurvey } from '../reducers/surveyReducer'
import { setNotification } from '../reducers/notificationReducer'

const UserSurveys = () => {
  const allSurveys = useSelector(state => state.surveys)
  const dispatch  = useDispatch()
  const user = useSelector(state =>  state.user)
  const history = useHistory()

  const handleRemove = (event, survey) => {
    event.preventDefault()
    const ok = window.confirm(`Delete survey ${survey.name}?`)
    if (ok) {
      dispatch(removeSurvey(survey))
      dispatch(setNotification(`Survey '${survey.name}' deleted.`, 5))
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
              <Button floated='right' color='red' size='tiny' onClick={(event) => handleRemove(event, survey)}>Delete Survey</Button>
              <div>Responses: {survey.answers}</div>
              <p style={{marginTop: '3px'}}><Link to={`/surveys/${survey.id}/results`}>View results</Link></p>
            </Segment>
          )}
        </Segment.Group>
      }
      
    </div>
  )
}

export default UserSurveys
