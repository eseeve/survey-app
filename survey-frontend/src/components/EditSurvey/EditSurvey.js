import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Header, Grid } from 'semantic-ui-react'

import { editSurvey } from '../../reducers/surveyReducer'
import EditSurveyForm from './EditSurveyForm'
import Notification from '../Notification'
import Menu from '../Menu'
import { setNotification } from '../../reducers/notificationReducer'

const EditSurvey = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (values) => {
    if (values.linearScales && values.linearScales.length) {
      if (!values.questions || values.questions.length === 0) { values.questions = [] }
      for (let i = 0; i < values.linearScales.length; i++) {
        let options = []
        for (let j = values.linearScales[i].beginning; j <= values.linearScales[i].end; j++) {
          options.push({ option: j })
        }
        values.questions.push({ options, title: values.linearScales[i].title, type: 'LinearScale'})
      }
      delete values.linearScales
    }
    dispatch(editSurvey(values))
    dispatch(setNotification(`Your survey '${values.name}' has been updated!`, 5))
    history.push('/')
  }

  return (
    <div>
      <Grid style={{paddingTop: '10px', marginBottom: '10px'}} columns='equal'>
        <Grid.Column width={14}>
          <Header as='h1' >Edit survey</Header>
        </Grid.Column>
        <Grid.Column style={{marginTop: '5px'}}>
          <Menu link='Home' />
        </Grid.Column>
      </Grid>
      <Notification />
      <EditSurveyForm onSubmit={handleSubmit} />
    </div>
  )
}

export default EditSurvey