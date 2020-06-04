import React, { useEffect  } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'

import { initializeSurveys } from './reducers/surveyReducer'
import Surveys from './components/Surveys'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeSurveys())
  }, [dispatch])

  return  (
    <div>
      <h1>Surveys</h1>
      <Surveys />
    </div>
  )
}

export default App
