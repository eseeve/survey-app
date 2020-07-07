const reducer = (state = 'light', action) => {
  switch (action.type) {
  case 'CHANGE_THEME':
    return action.data
  default:
    return state
  }
}

export const changeTheme = (theme) => {
  return async dispatch => {
    dispatch({
      type: 'CHANGE_THEME',
      data: theme,
    })
  }
}

export default reducer