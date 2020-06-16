import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { answerSurvey } from '../../reducers/surveyReducer'
import { setNotification } from '../../reducers/notificationReducer'
import TakeSurvey from './TakeSurvey'

const Survey = () => {
  const surveys = useSelector(state => state.surveys)
  const dispatch = useDispatch()
  const history = useHistory()

  const id = useParams().id
  const survey = surveys.find(s => s.id === id)

  const handleSubmit = (values) => {
    dispatch(answerSurvey(survey, values))
    dispatch(setNotification(`Your answers to the survey '${survey.name}' were saved!`, 5))
    history.push('/')
  }

  if (!survey) {
    return null
  }

  return (
    <div>
      <h1>{survey.name}</h1>
      <TakeSurvey survey={survey} onSubmit={handleSubmit}/>
    </div>
  )
}

export default Survey