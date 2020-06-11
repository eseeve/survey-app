import surveyService from '../services/surveys'

const byAnswers = (s1, s2) => s2.answers - s1.answers

const surveyReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT':
    return action.data.sort(byAnswers)
  case 'CREATE':
    return [...state, action.data]
  case 'ANSWER':
    return state.map(s => s.id === action.data.id ? action.data : s).sort(byAnswers)
  case 'REMOVE':
    return state.filter(s => s.id !== action.survey.id)
  default:
    return state
  }
}

export const initializeSurveys = () => {
  return async dispatch => {
    const surveys = await surveyService.getAll()
    dispatch({
      type: 'INIT',
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

export default surveyReducer