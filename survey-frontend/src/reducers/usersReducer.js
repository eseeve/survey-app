import usersService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  case 'CREATE':
    return [...state, action.data]
  default:
    return state
  }
}
export const initializeUsers = () => {
  return async dispatch => {
    const data = await usersService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data
    })
  }
}

export const createUser = (user) => {
  return async dispatch => {
    const data = await usersService.create(user)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}


export default reducer