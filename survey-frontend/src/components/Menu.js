import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Dropdown } from 'semantic-ui-react'

import { setNotification } from '../reducers/notificationReducer'
import { logout } from '../reducers/userReducer'
import storage from '../utils/storage'

import ThemeSwitch from './ThemeSwitch'

const Menu = ({ link }) => {
  const dispatch = useDispatch()
  let route

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setNotification('You have logged out.', 5))
    storage.logoutUser()
  }

  if (link === 'Home') {
    route = '/'
  } else if (link === 'My Surveys') {
    route = '/surveys'
  }

  return (
    <Dropdown text='Menu'>
      <Dropdown.Menu>
        <Dropdown.Item>
        <Button id='my-surveys' as={Link} to={route}>
          {link}
        </Button>
        </Dropdown.Item>
        <Dropdown.Item>
          <ThemeSwitch />
        </Dropdown.Item>
        <Dropdown.Item>
          <Button size='small' type='button' onClick={handleLogout} >
            Logout
          </Button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Menu