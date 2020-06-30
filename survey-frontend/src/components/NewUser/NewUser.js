import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Header, Button, Grid } from 'semantic-ui-react'

import { createUser } from '../../reducers/usersReducer'
import { setNotification } from '../../reducers/notificationReducer'
import UserForm from './UserForm'

const NewUser = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (values) => {
    delete values.confirmPassword
    dispatch(createUser(values))
    dispatch(setNotification(`Account created succesfully!`, 5))
    history.push('/')
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