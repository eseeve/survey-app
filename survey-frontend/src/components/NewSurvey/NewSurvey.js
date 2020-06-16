import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Header } from 'semantic-ui-react'

import { createSurvey } from '../../reducers/surveyReducer'
import SurveyForm from './SurveyForm'
import { setNotification } from '../../reducers/notificationReducer'

const NewSurvey = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (values) => {
    values.questions.map(q => q.type = 'MultipleChoice')
    values.answers = 0
    values.questions.map(q => q.options.map(o => o.votes = 0))
    dispatch(createSurvey(values))
    dispatch(setNotification(`New survey '${values.name}' created!`, 5))
    history.push('/')
  }

  return (
    <div>
      <Header as='h1' style={{marginTop: '10px'}}>Create new survey</Header>
      <SurveyForm onSubmit={handleSubmit} />
    </div>
  )
}

export default NewSurvey