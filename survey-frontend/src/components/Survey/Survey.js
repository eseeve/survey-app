import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Header, Grid } from 'semantic-ui-react'
import { SubmissionError } from 'redux-form'

import { answerSurvey } from '../../reducers/surveyReducer'
import { setNotification } from '../../reducers/notificationReducer'
import TakeSurvey from './TakeSurvey'
import mailService from '../../services/mail'
import Menu from '../Menu'

const Survey = () => {
  const surveys = useSelector(state => state.surveys)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const id = useParams().id
  const survey = surveys.find(s => s.id === id)

  const handleSubmit = (values) => {
    if (Object.keys(values).length < survey.questions.length) {
      throw new SubmissionError({
        _error: 'You must answer to all questions'
      })
    } else {
      if (survey.email) {
        const mailData = {
          to: survey.email,
          subject: `Response on ${survey.name}`,
          text: `
            ${user.name} has answered your survey '${survey.name}'.
            You can see the overall survey results from the following link
            ${window.location.href.concat('/results')}.
            `
        }
        mailService.send(mailData)
      }
      dispatch(answerSurvey(survey, values))
      dispatch(setNotification(`Your answers to the survey '${survey.name}' were saved!`, 5))
      history.push('/')
    }
  }

  if (!survey) {
    return null
  }

  return (
    <div>
      <Grid style={{paddingTop: '10px', marginBottom: '10px'}} columns='equal'>
        <Grid.Column width={14}>
          <Header as='h1' >{survey.name}</Header>
        </Grid.Column>
        <Grid.Column style={{marginTop: '5px'}} >
          <Menu link='Home' />
        </Grid.Column>
      </Grid>
      <div style={{fontSize: '16px', marginBottom: '5px'}}>{survey.description}</div>
      <TakeSurvey survey={survey} onSubmit={handleSubmit}/>
    </div>
  )
}

export default Survey