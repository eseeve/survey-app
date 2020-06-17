import React from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import Chart from "react-google-charts"

import { removeSurvey } from '../reducers/surveyReducer'

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
      <div>{total} answers</div>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data}
        rootProps={{ 'data-testid': '1' }}
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
    dispatch(removeSurvey(survey))
    history.push('/')
  }

  if (!survey) {
    return null
  }

  const total = survey.answers

  if (total === 0) {
    return (
    <div>
      <h1>{survey.name}</h1>
      No answers yet.
    </div>
    )
  }

  return(
    <div>
      <h1>{survey.name}</h1>
      <Questions questions={survey.questions} total={total}/>
      <Button color='red' size='tiny' onClick={handleClick}>Delete Survey</Button>
    </div>
  )
}

export default Results
