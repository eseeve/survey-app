import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { removeSurvey } from '../reducers/surveyReducer'

const Question = ({ question }) => {
  return (
    <div>
      <h4>{question.title}</h4>
      <ul>
        {question.options.map(o =>
          <li key={o}>{o}</li>
        )}
      </ul>
    </div>
  )
}

const Questions = ({ questions }) => {
  return (
    <div>
      {questions.map(q =>
        <Question key={q.title} question={q} />
      )}
    </div>
  )
}

const Survey = () => {
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

  return (
    <div>
      <h2>{survey.name}</h2>
      <Questions questions={survey.questions} />
      <button onClick={handleClick}>Remove Survey</button>
    </div>
  )
}

export default Survey