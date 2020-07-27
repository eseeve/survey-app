import usersService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  case 'CREATE_USER':
    return [...state, action.data]
  case 'EDIT_USER':
    return state.map(u => u.id === action.data.id ? action.data : u)
  case 'REMOVE_USER':
    return state.filter(u => u.id !== action.user.id)
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
      type: 'CREATE_USER',
      data
    })
  }
}

export const editUser = (user, id) => {
  return async dispatch => {
    const data = usersService.update(user, id)
    dispatch({
      type: 'EDIT_USER',
      data
    })
  }
}

export const removeUser = (user) => {
  return async dispatch => {
    const data = await usersService.remove(user.id)
    dispatch({
      type: 'REMOVE_USER',
      data,
      user
    })
  }
}


export default reducer