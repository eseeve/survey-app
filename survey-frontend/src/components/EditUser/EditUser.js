import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SubmissionError } from 'redux-form'
import { useHistory } from 'react-router-dom'
import { Header, Grid } from 'semantic-ui-react'

import { editUser } from '../../reducers/usersReducer'
import { setNotification } from '../../reducers/notificationReducer'
import EditUserForm from './EditUserForm'
import Menu from '../Menu'

const NewUser = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const loggedUser = useSelector(state => state.user)
  const user = users.find(u => u.username === loggedUser.username)
  const history = useHistory()

  const handleSubmit = (values) => {
    if (values.confirmPassword !== values.password) {
      throw new SubmissionError({
        confirmPassword: 'The passwords do not match'
      })
    } else {
      delete values.confirmPassword
      values.name = user.name
      values.username = user.username
      dispatch(editUser(values, user.id))
      dispatch(setNotification('Password changed succesfully!', 5))
      history.push('/surveys')
    }
  }

  return (
    <div>
      <Grid style={{paddingTop: '10px', marginBottom: '10px'}} columns='equal'>
        <Grid.Column width={14}>
          <Header as='h1' >Change Your Password</Header>
        </Grid.Column>
        <Grid.Column style={{marginTop: '5px'}}>
          <Menu link='My Surveys' />
        </Grid.Column>
      </Grid>
      <EditUserForm onSubmit={handleSubmit} />
    </div>
  )
}

export default NewUser