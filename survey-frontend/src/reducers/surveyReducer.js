import surveyService from '../services/surveys'

export const initializeSurveys = () => {
  return async dispatch => {
    const surveys = await surveyService.getAll()
    dispatch({
      type: 'INIT_SURVEYS',
      data: surveys,
    })
  }
}

export const createSurvey = (content) => {
  return async dispatch => {
    const data = await surveyService.create(content)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const removeSurvey = (survey) => {
  return async dispatch => {
    const data = await surveyService.remove(survey.id)
    dispatch({
      type: 'REMOVE',
      data,
      survey
    })
  }
}

const surveyReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_SURVEYS':
    if (!action.data) {
      return null
    }
    return action.data
  case 'CREATE':
    return [...state, action.data]
  case 'REMOVE':
    return state.filter(b => b.id!==action.survey.id)
  default:
    return state
  }
}

export default surveyReducer