import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import surveyReducer from './reducers/surveyReducer'

const rootReducer = combineReducers ({
  surveys: surveyReducer,
  notification: notificationReducer,
  form: formReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store