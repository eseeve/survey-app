import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification) {
    return null
  }

  const color = notification.type === 'success' ? 'ui green message' : 'ui red message'

  return (
    <div className={color}>
      {notification.message}
    </div>
  )
}

export default Notification