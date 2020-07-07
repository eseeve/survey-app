import React from 'react'
import { useSelector } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification) {
    return null
  }

  const color = notification.type === 'success' ? 'green' : 'red'

  return (
    <Message className='notification' color={color}>
      {notification.message}
    </Message>
  )
}

export default Notification