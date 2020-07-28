import React, { useState } from 'react'
import { useDispatch  } from 'react-redux'
import { Button, Modal, Form } from 'semantic-ui-react'

import { editSurvey } from '../reducers/surveyReducer'
import { setNotification } from '../reducers/notificationReducer'

const EmailModal = (survey) => {
  const dispatch = useDispatch()
  const [ email, setEmail ] = useState('')
  const [ showModal, setShowModal ] = useState(false)

  const handleSubscribe = (event, survey) => {
    event.preventDefault()
    if (!email || (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))) {
      closeModal()
      dispatch(setNotification('Invalid email address', 5, 'error'))
    } else {
      const updatedSurvey = { ...survey, email}
      dispatch(editSurvey(updatedSurvey))
      closeModal()
      dispatch(setNotification(`Your will receive emails about '${survey.name}' to ${email}`, 5))
    }
  }

  const handleUnsubscribe = (event, survey) => {
    event.preventDefault()
    const updatedSurvey = { ...survey, email: null}
    dispatch(editSurvey(updatedSurvey))
    dispatch(setNotification(`You have unsubscribed from receiving updates on '${survey.name}'.`, 5))
  }

  const closeModal = () => {
    setShowModal(false)
  }
  
  if (!survey.survey.email) {
    return (
      <Modal onClose={closeModal} open={showModal} trigger={<Button style={{marginBottom: '15px'}} className='teal-button' id='subscribe' type='button' color='teal' size='small' onClick={() => setShowModal(true)}>Subscribe</Button>} closeIcon>
        <Modal.Header>Send responses to your email</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input label='Email' placeholder='yourname@mail.com' value={email} onChange={(event) => setEmail(event.target.value)} />
            <Button style={{marginBottom: '10px'}} size='small' color='green' className='green-button' type='submit' onClick={(event) => handleSubscribe(event, survey.survey)}>Subscribe</Button>
          </Form>
        </Modal.Content>
    </Modal>
    )
  } else {
    return(
      <Button style={{marginBottom: '10px'}} size='small' color='red' type='button' className='red-button' onClick={(event) => handleUnsubscribe(event, survey.survey)}>Unsubscribe</Button>
    )
  }
  
}

export default EmailModal