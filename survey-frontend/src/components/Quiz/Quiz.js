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
import Score from './Score'
import mailService from '../../services/mail'

const Quiz = () => {
  const [ score, setScore ] = useState(null)
  const [ answers, setAnswers ] = useState(null)
  const quizzes = useSelector(state => state.quizzes)
  const user = useSelector(state => state.user)
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
      let rightAnswers = 0
      quiz.questions.forEach(q => {
        if (q.options[q.correct].option === values[q.title]) {
          rightAnswers += 1
        }
      })
      quiz.scores.push(rightAnswers)
      setScore(rightAnswers)
      setAnswers(values)
      if (quiz.email) {
        const mailData = {
          to: quiz.email,
          subject: `Response on ${quiz.name}`,
          text: `
            ${user.name} has answered your quiz '${quiz.name}'.
            You can see the overall quiz results from the following link
            ${window.location.href.concat('/results')}.
            `
        }
        mailService.send(mailData)
      }
      dispatch(answerQuiz(quiz, values))
      dispatch(setNotification(`Your answers to the quiz '${quiz.name}' were saved!`, 5))
    }
  }

  const handleClick = (event) => {
    event.preventDefault()
    setScore(null)
    setAnswers(null)
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
      <Score quiz={quiz} answers={answers} />
      <Button className='teal-button' color='teal' style={{marginTop: '10px', marginBottom: '10px'}} onClick={handleClick} floated='left'>Back to quizzes</Button>
      <Button className='teal-button' color='teal' style={{marginTop: '10px', marginBottom: '10px'}} onClick={() => window.location.reload(false)} floated='left'>Take {quiz.name} again</Button>
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
      <div style={{fontSize: '16px', marginBottom: '5px'}}>{quiz.description}</div>
      <TakeQuiz quiz={quiz} onSubmit={handleSubmit}/>
    </div>
  )
}

export default Quiz