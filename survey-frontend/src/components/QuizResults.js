import React from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Header, Grid, Button } from 'semantic-ui-react'
import Chart from "react-google-charts"

import Menu from './Menu'
import Notification from './Notification' 

import { resetQuiz } from '../reducers/quizReducer'
import { setNotification } from '../reducers/notificationReducer'

const QuizQuestion = ({ theme, question, total }) => {
  let data = question.options.map(o => {
    return [
      o.option,
      o.votes
    ]
  })
  data.unshift(['Option', 'Votes'])

  const backgroundColor = theme === 'dark' ? '#111111' : 'white'
  const textColor = theme === 'dark' ? '#eeeeee' : 'black'

  return (
    <div>
      <h4>{question.title}</h4>
      <div>{total} responses</div>
      <Chart
        className='chart'
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        options={{
          tooltip: { trigger: 'selection' },
          legend: { textStyle: { color: textColor } },
          backgroundColor
        }}
        data={data}
      />
    </div>
  )
}

const Questions = ({ theme, questions, total }) => {
  return (
    <div>
    </div>
  )
}

const QuizResults = () => {
  const quizzes = useSelector(state => state.quizzes)
  const theme = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const id = useParams().id
  const quiz = quizzes.find(s => s.id === id)

  const handleRemoveResponses = (event, quiz) => {
    event.preventDefault()
    const ok = window.confirm(`Delete all responses from quiz ${quiz.name}?`)
    if (ok) {
      dispatch(resetQuiz(quiz))
      dispatch(setNotification(`All responses from quiz '${quiz.name}' deleted.`, 5))
    }
  }

  if (!quiz) {
    return null
  }

  const total = quiz.answers

  return(
    <div>
      <Grid style={{paddingTop: '10px', marginBottom: '10px'}} columns='equal'>
        <Grid.Column width={14} >
          <Header as='h1' >{quiz.name}</Header>
        </Grid.Column>
        <Grid.Column style={{marginTop: '5px'}}>
          <Menu link='Home' />
        </Grid.Column>
      </Grid>
      <Notification />
      {total === 0 ? <div style={{marginBottom: '10px'}}>No answers yet.</div> : <Questions theme={theme} questions={quiz.questions} total={total}/>}
      <div style={{marginBottom: '20px'}}>Created by {quiz.user.name}</div>
      <Button style={{marginBottom: '10px'}} className='red-button' id='delete-responses' color='red' size='small' onClick={(event) => handleRemoveResponses(event, quiz)}>Delete Responses</Button>
    </div>
  )
}

export default QuizResults
