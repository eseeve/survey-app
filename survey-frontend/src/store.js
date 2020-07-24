import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import surveyReducer from './reducers/surveyReducer'
import quizReducer from './reducers/quizReducer'
import themeReducer from './reducers/themeReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import filterReducer from './reducers/filterReducer'
import loadSurvey from './reducers/loadSurvey'
import loadQuiz from './reducers/loadQuiz'


const rootReducer = combineReducers ({
  surveys: surveyReducer,
  users: usersReducer,
  notification: notificationReducer,
  user: userReducer,
  theme: themeReducer,
  filter: filterReducer,
  quizzes: quizReducer,
  editSurvey: loadSurvey,
  editQuiz: loadQuiz,
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