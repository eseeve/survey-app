import React from 'react'
import { useDispatch } from 'react-redux'

import { createSurvey } from '../../reducers/surveyReducer'
import SurveyForm from './SurveyForm'

const NewSurvey = () => {
  const dispatch = useDispatch()

  const handleSubmit = (values) => {
    console.log(values)
    values.questions.map(q => q.type = 'MultipleChoice')
    values.answers = 0
    values.questions.map(q => q.options.map(o => o.votes = 0))
    dispatch(createSurvey(values))
  }

  return (
    <div>
      <h2>Create new survey</h2>
      <SurveyForm onSubmit={handleSubmit} />
    </div>
  )
}

export default NewSurvey