import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { removeSurvey, answerSurvey } from '../../reducers/surveyReducer'
import TakeSurvey from './TakeSurvey'

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

  const handleSubmit = (values) => {
    dispatch(answerSurvey(survey, values))
    history.push('/')
  }

  if (!survey) {
    return null
  }

  return (
    <div>
      <h1>{survey.name}</h1>
      <TakeSurvey survey={survey} onSubmit={handleSubmit}/>
      <button onClick={handleClick}>Remove Survey</button>
    </div>
  )
}

export default Survey