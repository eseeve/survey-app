import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Header, Grid } from 'semantic-ui-react'
import { SubmissionError } from 'redux-form'

import { setNotification } from '../../reducers/notificationReducer'
import TakeQuiz from './TakeQuiz'
import Menu from '../Menu'
import { answerQuiz } from '../../reducers/quizReducer'


const Survey = () => {
  const quizzes = useSelector(state => state.quizzes)
  const dispatch = useDispatch()
  const history = useHistory()

  const id = useParams().id
  const quiz = quizzes.find(q => q.id === id)

  const handleSubmit = (values) => {
    if (Object.keys(values).length < quiz.questions.length) {
      throw new SubmissionError({
        _error: 'You must answer to all questions'
      })
    } else {
      dispatch(answerQuiz(quiz, values))
      dispatch(setNotification(`Your answers to the survey '${quiz.name}' were saved!`, 5))
      history.push('/quizzes')
    }
  }

  if (!quiz) {
    return null
  }

  return (
    <div>
      <Grid style={{paddingTop: '10px', marginBottom: '10px'}} columns='equal'>
        <Grid.Column width={14}>
          <Header as='h1' >{quiz.name}</Header>
        </Grid.Column>
        <Grid.Column style={{marginTop: '5px'}} >
          <Menu link='Home' />
        </Grid.Column>
      </Grid>
      <TakeQuiz quiz={quiz} onSubmit={handleSubmit}/>
    </div>
  )
}

export default Survey