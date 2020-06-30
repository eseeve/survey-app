import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Header, Grid, Button } from 'semantic-ui-react'

import { answerSurvey } from '../../reducers/surveyReducer'
import { setNotification } from '../../reducers/notificationReducer'
import TakeSurvey from './TakeSurvey'
import { SubmissionError } from 'redux-form'

const Survey = () => {
  const surveys = useSelector(state => state.surveys)
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
      dispatch(answerSurvey(survey, values))
      dispatch(setNotification(`Your answers to the survey '${survey.name}' were saved!`, 5))
      history.push('/')
    }
  }

  const handleClick = () => {
    history.push('/')
  }

  if (!survey) {
    return null
  }

  return (
    <div>
      <Grid style={{marginTop: '10px', marginBottom: '10px'}} columns={2}>
        <Grid.Column >
          <Header as='h1' >{survey.name}</Header>
        </Grid.Column>
        <Grid.Column >
          <Button floated='right' primary size='small' type='button' onClick={handleClick} >
            Home
          </Button>
        </Grid.Column>
      </Grid>
      <TakeSurvey survey={survey} onSubmit={handleSubmit}/>
    </div>
  )
}

export default Survey