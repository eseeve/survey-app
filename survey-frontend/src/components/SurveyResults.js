import React, { useState } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Header, Grid, Button, Modal, Form } from 'semantic-ui-react'
import Chart from "react-google-charts"

import Menu from './Menu'
import Notification from './Notification' 

import { resetSurvey, addEmailSurvey } from '../reducers/surveyReducer'
import { setNotification } from '../reducers/notificationReducer'

const EmailModal = (survey) => {
  const dispatch = useDispatch()
  const [ email, setEmail ] = useState('')
  const [ showModal, setShowModal ] = useState(false)

  const handleSubscribe = (event, survey) => {
    event.preventDefault()
    dispatch(addEmailSurvey(email, survey))
    closeModal()
    dispatch(setNotification(`Your will receive emails about '${survey.name}' to ${email}.`, 5))
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <Modal onClose={closeModal} open={showModal} trigger={<Button style={{marginBottom: '15px'}} className='teal-button' id='subscribe' color='teal' size='small' onClick={() => setShowModal(true)}>Subscribe</Button>} closeIcon>
      <Modal.Header>Send responses to your email</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input label='Email' placeholder='yourname@mail.com' value={email} onChange={(event) => setEmail(event.target.value)} />
          <Button floated='right' style={{marginBottom: '10px'}} size='small' color='green' className='green-button' onClick={(event) => handleSubscribe(event, survey.survey)}>Subscribe</Button>
        </Form>
      </Modal.Content>
  </Modal>
  )
}

const MultipleChoiceQuestion = ({ theme, question, total }) => {
  let data = question.options.map(o => {
    return [
      o.option,
      o.votes
    ]
  })
  data.unshift(['Option', 'Votes'])

  const backgroundColor = theme === 'dark' ? '#111111' : 'white'
  const textColor = theme === 'dark' ? '#eeeeee' : 'black'

  return (
    <div>
      <h4>{question.title}</h4>
      <div>{total} responses</div>
      <Chart
        className='chart'
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        options={{
          tooltip: { trigger: 'selection' },
          legend: { textStyle: { color: textColor } },
          backgroundColor
        }}
        data={data}
      />
    </div>
  )
}

const CheckboxQuestion = ({ theme, question, total }) => {
  let data = question.options.map(o => {
    return [
      o.option,
      o.votes
    ]
  })
  data.unshift(['Option', 'Votes'])

  const backgroundColor = theme === 'dark' ? '#111111' : 'white'
  const textColor = theme === 'dark' ? '#eeeeee' : 'black'

  return (
    <div>
      <h4>{question.title}</h4>
      <div>{total} responses</div>
      <Chart
        className='chart'
        width={'500px'}
        height={'300px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        options={{
          legend: { position: 'none' },
          hAxis: { textStyle: { color: textColor } },
          vAxis: { textStyle: { color: textColor } },
          backgroundColor
        }}
        data={data}
      />
    </div>
  )
}

const LinearScaleQuestion = ({ theme, question, total }) => {
  let data = question.options.map(o => {
    return [
      o.option,
      o.votes
    ]
  })
  data.unshift(['Option', 'Votes'])

  const backgroundColor = theme === 'dark' ? '#111111' : 'white'
  const textColor = theme === 'dark' ? '#eeeeee' : 'black'

  return (
    <div>
      <h4>{question.title}</h4>
      <div>{total} responses</div>
      <Chart
        className='chart'
        width={'500px'}
        height={'300px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        options={{
          orientation: 'horizontal',
          legend: { position: 'none' },
          hAxis: { textStyle: { color: textColor }, gridlines: { count: 0 } },
          vAxis: { textStyle: { color: textColor } },
          backgroundColor
        }}
        data={data}
      />
    </div>
  )
}

const Questions = ({ theme, questions, total }) => {
  return (
    <div>
      {questions.map(q =>
      <div key={q.title}>
        {q.type === 'LinearScale' && <LinearScaleQuestion theme={theme} question={q} total={total} />}
        {q.type === 'MultipleChoice' && <MultipleChoiceQuestion theme={theme} question={q} total={total} />}
        {q.type === 'Checkboxes' && <CheckboxQuestion theme={theme} question={q} total={total} />}
      </div>
      )}
    </div>
  )
}

const SurveyResults = () => {
  const surveys = useSelector(state => state.surveys)
  const theme = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const id = useParams().id
  const survey = surveys.find(s => s.id === id)

  const handleRemoveResponses = (event, survey) => {
    event.preventDefault()
    const ok = window.confirm(`Delete all responses from survey ${survey.name}?`)
    if (ok) {
      dispatch(resetSurvey(survey))
      dispatch(setNotification(`All responses from survey '${survey.name}' deleted.`, 5))
    }
  }

  if (!survey) {
    return null
  }

  const total = survey.answers

  return(
    <div>
      <Grid style={{paddingTop: '10px', marginBottom: '10px'}} columns='equal'>
        <Grid.Column width={14} >
          <Header as='h1' >{survey.name}</Header>
        </Grid.Column>
        <Grid.Column style={{marginTop: '5px'}}>
          <Menu link='Home' />
        </Grid.Column>
      </Grid>
      <Notification />
      <EmailModal survey={survey} />
      {total === 0 ? <div style={{marginBottom: '10px'}}>No answers yet.</div> : <Questions theme={theme} questions={survey.questions} total={total}/>}
      <Button style={{marginBottom: '10px'}} className='red-button' id='delete-responses' color='red' size='small' onClick={(event) => handleRemoveResponses(event, survey)}>Delete Responses</Button>
    </div>
  )
}

export default SurveyResults
