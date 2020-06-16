import React from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { removeSurvey } from '../reducers/surveyReducer'

const Question = ({ question, total }) => {
  return (
    <div>
      <h4>{question.title}</h4>
      <ul>
        {question.options.map(o => 
         <li key={o.option}>
           {o.option}, {o.votes/total * 100} % of people answered this
          </li>
        )}
      </ul>
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

  return(
    <div>
      <h1>{survey.name}</h1>
      <Questions questions={survey.questions} total={total}/>
      <button onClick={handleClick}>Remove Survey</button>
    </div>
  )
}

export default Results
