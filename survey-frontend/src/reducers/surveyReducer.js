/* eslint-disable no-case-declarations */
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

export const createSurvey = (survey) => {
  return async dispatch => {
    const data = await surveyService.create(survey)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const answerSurvey = (id, values) => {
  return async dispatch => {
    const answeredSurvey = await surveyService.answer(id)
    dispatch({
      type: 'ANSWER',
      data: {
        survey: answeredSurvey,
        values
      }
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
  case 'ANSWER':
    const survey = action.data.survey
    const id = survey.id
    const surveyToAnswer = state.find(s => s.id === id)
    const answeredSurvey = {
      ...surveyToAnswer,
      answers: surveyToAnswer.answers + 1
    }
    console.log(answeredSurvey)
    return state.map(s =>
      s.id !== id ? s : answeredSurvey
    )
  case 'REMOVE':
    return state.filter(b => b.id!==action.survey.id)
  default:
    return state
  }
}

export default surveyReducer