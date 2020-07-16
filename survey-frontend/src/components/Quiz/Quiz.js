import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Header, Grid, Button } from 'semantic-ui-react'
import { SubmissionError } from 'redux-form'

import { setNotification } from '../../reducers/notificationReducer'
import TakeQuiz from './TakeQuiz'
import Menu from '../Menu'
import { answerQuiz } from '../../reducers/quizReducer'
import Notification from '../Notification'

const Score = ({ quiz }) => {
  return (
    <div>
      <h3>Correct answers</h3>
        {quiz.questions.map(q => 
          <div key={q.id}>
            <h4>{q.title}</h4>
            <div>Correct answer: {q.options[q.correct].option}</div>
          </div>
        )}
    </div>
  )
}

const Quiz = () => {
  const [ score, setScore ] = useState(null)
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
      setScore(0)
      quiz.questions.forEach(q => {
        if (q.options[q.correct].option === values[q.title]) {
          setScore(score + 1)
        }
      })
      dispatch(answerQuiz(quiz, values))
      dispatch(setNotification(`Your answers to the quiz '${quiz.name}' were saved!`, 5))
    }
  }

  const handleClick = (event) => {
    event.preventDefault()
    setScore(null)
    history.push('/quizzes')
  }

  if (!quiz) {
    return null
  }

  if (score !== null) {
    return (
      <div>
      <Grid style={{paddingTop: '10px', marginBottom: '10px'}} columns='equal'>
        <Grid.Column width={14}>
          <Header as='h1' >Your score on {quiz.name}</Header>
        </Grid.Column>
        <Grid.Column style={{marginTop: '5px'}} >
          <Menu link='Home' />
        </Grid.Column>
      </Grid>
      <Notification />
      <div style={{marginBottom: '10px'}}>
        You got {score}/{quiz.questions.length} answers correct.
      </div>
      <Score quiz={quiz} />
      <Button className='teal-button' color='teal' style={{marginTop: '10px', marginBottom: '10px'}} onClick={handleClick} floated='left'>Back to quizzes</Button>
    </div>
    )
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

export default Quiz