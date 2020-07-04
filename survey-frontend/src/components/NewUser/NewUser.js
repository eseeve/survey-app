import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SubmissionError } from 'redux-form'
import { useHistory } from 'react-router-dom'
import { Header, Button, Grid } from 'semantic-ui-react'

import { createUser } from '../../reducers/usersReducer'
import { setNotification } from '../../reducers/notificationReducer'
import UserForm from './UserForm'

const NewUser = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const history = useHistory()

  const handleSubmit = (values) => {
    if (users.map(u => u.username).includes(values.username)) {
      throw new SubmissionError({
        username: 'This username is already taken'
      })
    } else if (values.confirmPassword !== values.password) {
      throw new SubmissionError({
        confirmPassword: 'The passwords do not match'
      })
    } else {
      delete values.confirmPassword
      dispatch(createUser(values))
      dispatch(setNotification('Account created succesfully!', 5))
      history.push('/')
    }
  }

  const handleClick = () => {
    history.push('/')
  }

  return (
    <div>
      <Grid style={{marginTop: '10px', marginBottom: '10px'}} columns={2}>
        <Grid.Column >
          <Header as='h1' >Sign up for Survey App</Header>
        </Grid.Column>
        <Grid.Column >
          <Button floated='right' primary size='small' type='button' onClick={handleClick} >
            Cancel
          </Button>
      </Grid.Column>
      </Grid>
      <UserForm onSubmit={handleSubmit} />
    </div>
  )
}

export default NewUser