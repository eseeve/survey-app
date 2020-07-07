import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import surveyReducer from './reducers/surveyReducer'
import themeReducer from './reducers/themeReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'


const rootReducer = combineReducers ({
  surveys: surveyReducer,
  users: usersReducer,
  notification: notificationReducer,
  user: userReducer,
  theme: themeReducer,
  form: formReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

if (window.Cypress) {
  window.store = store;
}

export default store