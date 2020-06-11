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

export const answerSurvey = (survey, values) => {
  return async dispatch => {
    survey.questions.map(question =>
      question.options.map(o => values[question.title] === o.option ? o.votes += 1 : o)
    )
    const toAnswer = { ...survey, answers: survey.answers + 1 }
    const data = await surveyService.update(toAnswer)
    dispatch({
      type: 'ANSWER',
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
  case 'ANSWER':
    const answered = action.data
    return state.map(s => s.id === answered.id ? answered : s)
  case 'REMOVE':
    return state.filter(s => s.id !== action.survey.id)
  default:
    return state
  }
}

export default surveyReducer