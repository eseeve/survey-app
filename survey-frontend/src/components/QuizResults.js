import React from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Header, Grid, Button, Segment, Container } from 'semantic-ui-react'
import Chart from "react-google-charts"

import Menu from './Menu'
import Notification from './Notification' 

import { resetQuiz } from '../reducers/quizReducer'
import { setNotification } from '../reducers/notificationReducer'

const QuizQuestion = ({ theme, question, total }) => {
  let data = question.options.map(o => {
    return [
      o.option,
      o.votes,
      'gray'
    ]
  })
  data.unshift(['Option', 'Votes', { role: 'style' }])
  data[question.correct + 1] = [String.fromCharCode(10003).concat(' ' + data[question.correct + 1][0]), data[question.correct + 1][1], '#00c800']

  const backgroundColor = theme === 'dark' ? '#111111' : 'white'
  const textColor = theme === 'dark' ? '#eeeeee' : 'black'

  return (
    <div>
      <h4>{question.title}</h4>
      <div>{question.options[question.correct].votes} / {total} correct responses</div>
      <Chart
        className='chart'
        width={'500px'}
        height={'300px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        options={{
          legend: { position: 'none' },
          hAxis: { textStyle: { color: textColor } },
          vAxis: { textStyle: { color: textColor } },
          backgroundColor
        }}
        data={data}
      />
    </div>
  )
}

const Questions = ({ theme, questions, total, scores }) => {
  const totalPoints = questions.length
  const scoresSum = scores.reduce((a,b) => a + b, 0)

  const backgroundColor = theme === 'dark' ? '#111111' : 'white'
  const textColor = theme === 'dark' ? '#eeeeee' : 'black'

  let data = Array.from(new Set(scores))
  data = data.map(d => [d, scores.filter(x => x === d).length])
  data.unshift(['Number of respondents', 'Points scored'])

  return (
    <div>
      <Header as='h2'>Statistics</Header>
      <Grid style={{marginBottom: '10px'}} columns={3}>
        <Grid.Column>
          <Segment>
            <Container textAlign='center'>
              <strong>Average</strong><br/>
              { (scoresSum / total).toFixed(1) } / { totalPoints } points
            </Container>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Container textAlign='center'>
              <strong>Median</strong><br/>
              { scores.sort((a,b) => a - b)[Math.floor(total / 2)] } / { totalPoints } points
            </Container>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Container textAlign='center'>
              <strong>Range</strong><br/>
              { Math.min( ...scores ) } - { Math.max( ...scores ) } points
            </Container>
          </Segment>
        </Grid.Column>
      </Grid>
      <Header as='h4'>Total points distribution</Header>
      <Chart
        className='chart'
        width={'500px'}
        height={'300px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        options={{
          orientation: 'horizontal',
          legend: { position: 'none' },
          hAxis: { title: 'Points scored', textStyle: { color: textColor }, gridlines: { count: 0 } },
          vAxis: { title: 'Number of respondents', textStyle: { color: textColor } },
          backgroundColor
        }}
        data={data}
      />
      <Header as='h2'>Questions</Header>
      {questions.map(q =>
        <QuizQuestion key={q.title} theme={theme} question={q} total={total} />
      )}
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
      {total === 0 ? <div style={{marginBottom: '10px'}}>No answers yet.</div> : <Questions theme={theme} questions={quiz.questions} total={total} scores={quiz.scores}/>}
      <div style={{marginTop: '10px', marginBottom: '20px'}}>Created by {quiz.user.name}</div>
      <Button style={{marginBottom: '10px'}} className='red-button' id='delete-responses' color='red' size='small' onClick={(event) => handleRemoveResponses(event, quiz)}>Delete Responses</Button>
    </div>
  )
}

export default QuizResults
