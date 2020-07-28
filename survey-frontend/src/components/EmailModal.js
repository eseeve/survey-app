import React, { useState } from 'react'
import { useDispatch  } from 'react-redux'
import { Button, Modal, Form } from 'semantic-ui-react'

import { addEmailSurvey } from '../reducers/surveyReducer'
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

export default EmailModal