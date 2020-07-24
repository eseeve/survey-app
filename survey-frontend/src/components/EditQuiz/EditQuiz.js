import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Header, Grid } from 'semantic-ui-react'
import { SubmissionError } from 'redux-form'

import { editQuiz } from '../../reducers/quizReducer'
import EditQuizForm from './EditQuizForm'
import Notification from '../Notification'
import Menu from '../Menu'
import { setNotification } from '../../reducers/notificationReducer'

const EditQuiz = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (values) => {
    values.questions.forEach(q => {
      if (!q.options || q.options.length < 4) {
        throw new SubmissionError({
          _error: 'Fill out all options in all questions'
        })
      }
    })
    dispatch(editQuiz(values))
    dispatch(setNotification(`Your quiz '${values.name}' has been updated!`, 5))
    history.push('/quizzes')
  }

  return (
    <div>
      <Grid style={{paddingTop: '10px', marginBottom: '10px'}} columns='equal'>
        <Grid.Column width={14}>
          <Header as='h1' >Edit quiz</Header>
        </Grid.Column>
        <Grid.Column style={{marginTop: '5px'}}>
          <Menu link='Home' />
        </Grid.Column>
      </Grid>
      <Notification />
      <EditQuizForm onSubmit={handleSubmit} />
    </div>
  )
}

export default EditQuiz