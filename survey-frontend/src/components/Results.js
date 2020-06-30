import React from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Button, Header } from 'semantic-ui-react'
import Chart from "react-google-charts"

import { removeSurvey } from '../reducers/surveyReducer'
import { setNotification } from '../reducers/notificationReducer'

const Question = ({ question, total }) => {
  let data = question.options.map(o => {
    return [
      o.option,
      o.votes
    ]
  })
  data.unshift(['Option', 'Votes'])
  return (
    <div>
      <h4>{question.title}</h4>
      <div>{total} responses</div>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        options={{
          tooltip: { trigger: 'selection' },
        }}
        data={data}
      />
    </div>
  )
}

const Questions = ({ questions, total }) => {
  return (
    <div>
      {questions.map(q =>
        <Question key={q.title} question={q} total={total} />
      )}
    </div>
  )
}

const Results = () => {
  const surveys = useSelector(state => state.surveys)
  const dispatch = useDispatch()
  const history = useHistory()

  const id = useParams().id
  const survey = surveys.find(s => s.id === id)

  const handleClick = () => {
    const ok = window.confirm(`Remove survey ${survey.name}?`)
    if (ok) {
      dispatch(removeSurvey(survey))
      dispatch(setNotification(`Survey '${survey.name}' deleted.`, 5))
      history.push('/')
    }
  }

  if (!survey) {
    return null
  }

  const total = survey.answers

  if (total === 0) {
    return (
    <div>
      <Header as='h1' style={{marginTop: '10px'}}>{survey.name}</Header>
      No answers yet. <br/>
      <Button style={{marginTop: '10px'}} color='red' size='tiny' onClick={handleClick}>Delete Survey</Button>
    </div>
    )
  }

  return(
    <div>
      <Header as='h1' style={{marginTop: '10px'}}>{survey.name}</Header>
      <Questions questions={survey.questions} total={total}/>
      <Button color='red' size='tiny' onClick={handleClick}>Delete Survey</Button>
    </div>
  )
}

export default Results
