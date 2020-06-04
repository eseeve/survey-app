import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import surveyReducer from './reducers/surveyReducer'

const store = createStore(
  surveyReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store