import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Header, Button, Grid } from 'semantic-ui-react'

import { createSurvey } from '../../reducers/surveyReducer'
import SurveyForm from './SurveyForm'
import Notification from '../Notification'
import { setNotification } from '../../reducers/notificationReducer'

const NewSurvey = () => {
  const initialSurveys = useSelector(state => state.surveys)
  const surveyLength = initialSurveys.length
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (values) => {
      dispatch(createSurvey(values))
      if (initialSurveys.length > surveyLength) {
        dispatch(setNotification(`New survey '${values.name}' created!`, 5))
        history.push('/')
      } else {
        dispatch(setNotification(`Something went wrong`, 5, 'error'))
      }
  }

  const handleHomeClick = () => {
    history.push('/')
  }

  return (
    <div>
      <Grid style={{marginTop: '10px', marginBottom: '10px'}} columns={2}>
        <Grid.Column >
          <Header as='h1' >Create new survey</Header>
        </Grid.Column>
        <Grid.Column >
          <Button floated='right' primary size='small' type='button' onClick={handleHomeClick} >
            Home
          </Button>
      </Grid.Column>
      </Grid>
      <Notification />
      <SurveyForm onSubmit={handleSubmit} />
    </div>
  )
}

export default NewSurvey