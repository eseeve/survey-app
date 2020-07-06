import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SubmissionError } from 'redux-form'
import { useHistory, Link } from 'react-router-dom'
import { Header, Button, Grid, Dropdown } from 'semantic-ui-react'

import { createUser } from '../../reducers/usersReducer'
import { setNotification } from '../../reducers/notificationReducer'
import ThemeSwitch from '../ThemeSwitch'
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

  return (
    <div>
      <Grid style={{paddingTop: '10px', marginBottom: '10px'}} columns='equal'>
        <Grid.Column width={14}>
          <Header as='h1' >Sign up for Survey App</Header>
        </Grid.Column>
        <Grid.Column style={{marginTop: '5px'}}>
        <Dropdown text='Menu'>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Button id='my-surveys' as={Link} to={'/'}>
                Home
              </Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <ThemeSwitch />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </Grid.Column>
      </Grid>
      <UserForm onSubmit={handleSubmit} />
    </div>
  )
}

export default NewUser