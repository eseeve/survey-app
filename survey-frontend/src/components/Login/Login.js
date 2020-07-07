import React from 'react'
import { useDispatch } from 'react-redux'
import { Header, Grid, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { setNotification } from '../../reducers/notificationReducer'
import { login } from '../../reducers/userReducer'
import storage from '../../utils/storage'
import LoginForm from './LoginForm'
import ThemeSwitch from '../ThemeSwitch'
import Notification from '../Notification'
import loginService from '../../services/login'


const Login = () => {
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
      <Grid style={{paddingTop: '10px', marginBottom: '10px'}} columns='equal'>
        <Grid.Column width={14} >
        <Header as='h1'>Login to application</Header>
        </Grid.Column>
        <Grid.Column style={{marginTop: '5px'}}>
        <Dropdown text='Menu'>
          <Dropdown.Menu>
            <Dropdown.Item>
              <ThemeSwitch />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </Grid.Column>
      </Grid>
      
      <Notification />
      <LoginForm onSubmit={handleSubmit}/>
      <div style={{marginTop: '10px'}}>Not a user yet? Click <Link className='link' to={`/signup`}>here</Link>!</div>
    </div>
  )
}

export default Login