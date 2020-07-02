import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Header, Button, Grid } from 'semantic-ui-react'

import { createSurvey } from '../../reducers/surveyReducer'
import SurveyForm from './SurveyForm'
import { setNotification } from '../../reducers/notificationReducer'

const NewSurvey = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (values) => {
    console.log(values)
    dispatch(createSurvey(values))
    dispatch(setNotification(`New survey '${values.name}' created!`, 5))
    history.push('/')
  }

  const handleClick = () => {
    history.push('/')
  }

  return (
    <div>
      <Grid style={{marginTop: '10px', marginBottom: '10px'}} columns={2}>
        <Grid.Column >
          <Header as='h1' >Create new survey</Header>
        </Grid.Column>
        <Grid.Column >
          <Button floated='right' primary size='small' type='button' onClick={handleClick} >
            Home
          </Button>
      </Grid.Column>
      </Grid>
      <SurveyForm onSubmit={handleSubmit} />
    </div>
  )
}

export default NewSurvey