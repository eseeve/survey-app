import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Header } from 'semantic-ui-react'

import { setNotification } from '../../reducers/notificationReducer'
import { login } from '../../reducers/userReducer'
import storage from '../../utils/storage'
import LoginForm from './LoginForm'
import Notification from '../Notification'
import loginService from '../../services/login'

const Login = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  const handleSubmit = async (values) => {
    const username = values.username
    const password = values.password
    try {
      const user = await loginService.login({
        username, password
      })
      dispatch(login(user))
      dispatch(setNotification(`${user.name} welcome back!`, 5))
      storage.saveUser(user)
    } catch(exception) {
      dispatch(setNotification('Wrong username or password', 5, 'error'))
    }
  }

  return (
    <div>
      <Header as='h1' style={{marginTop: '10px'}}>Login to application</Header>
      <Notification />
      <LoginForm onSubmit={handleSubmit}/>
    </div>
  )
}

export default Login