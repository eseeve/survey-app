import surveyService from '../services/surveys'

const byAnswers = (s1, s2) => s2.answers - s1.answers

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_SURVEYS':
    return action.data.sort(byAnswers)
  case 'CREATE_SURVEY':
    return [...state, action.data]
  case 'ANSWER_SURVEY':
    return state.map(s => s.id === action.data.id ? action.data : s).sort(byAnswers)
  case 'REMOVE_SURVEY':
    return state.filter(s => s.id !== action.survey.id)
  default:
    return state
  }
}

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
      type: 'CREATE_SURVEY',
      data
    })
  }
}

export const answerSurvey = (survey, values) => {
  return async dispatch => {
    survey.questions.map(question => {
      if (question.type === 'MultipleChoice') {
        question.options.map(o => values[question.title] === o.option ? o.votes += 1 : o)
        if (question.isOpen && question.options.every(o => o.option !== values[question.title])) {
          question.options.push({ option: values[question.title], votes: 1, custom: true })
        }
      } else if (question.type === 'Checkboxes') {
        question.options.map(o => values[question.title][o.option] === true ? o.votes += 1 : o)
      }
      return question
    })
    const toAnswer = { ...survey, answers: survey.answers + 1 }
    const data = await surveyService.update(toAnswer)
    dispatch({
      type: 'ANSWER_SURVEY',
      data
    })
  }
}

export const removeSurvey = (survey) => {
  return async dispatch => {
    const data = await surveyService.remove(survey.id)
    dispatch({
      type: 'REMOVE_SURVEY',
      data,
      survey
    })
  }
}

export default reducer