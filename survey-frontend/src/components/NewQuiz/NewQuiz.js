import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Header, Grid } from 'semantic-ui-react'

import { createQuiz } from '../../reducers/quizReducer'
import QuizForm from './QuizForm'
import Notification from '../Notification'
import Menu from '../Menu'
import { setNotification } from '../../reducers/notificationReducer'

const NewSurvey = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (values) => {
    dispatch(createQuiz(values))
    dispatch(setNotification(`New survey '${values.name}' created!`, 5))
    history.push('/')
  }

  return (
    <div>
      <Grid style={{paddingTop: '10px', marginBottom: '10px'}} columns='equal'>
        <Grid.Column width={14}>
          <Header as='h1' >Create new quiz</Header>
        </Grid.Column>
        <Grid.Column style={{marginTop: '5px'}}>
          <Menu link='Home' />
        </Grid.Column>
      </Grid>
      <Notification />
      <QuizForm onSubmit={handleSubmit} />
    </div>
  )
}

export default NewSurvey