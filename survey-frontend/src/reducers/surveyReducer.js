import surveyService from '../services/surveys'

const byMostAnswers = (s1, s2) => s2.answers - s1.answers
const byLeastAnswers = (s1, s2) => s1.answers - s2.answers
const byUser = (s1, s2) => s1.user.name.localeCompare(s2.user.name)

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_SURVEYS':
    return action.data.sort(byMostAnswers)
  case 'SORT_SURVEYS':
    return state.sort(action.data)
  case 'CREATE_SURVEY':
    return [...state, action.data]
  case 'ANSWER_SURVEY':
    return state.map(s => s.id === action.data.id ? action.data : s).sort(byMostAnswers)
  case 'REMOVE_SURVEY':
    return state.filter(s => s.id !== action.survey.id)
  case 'EDIT_SURVEY':
    return state.map(s => s.id === action.data.id ? action.data : s).sort(byMostAnswers)
  case 'RESET_SURVEY':
    return state.map(s => s.id === action.data.id ? action.data : s).sort(byMostAnswers)
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
      if (question.type === 'MultipleChoice' || question.type === 'LinearScale') {
        question.options.map(o => values[question.title] === o.option ? o.votes += 1 : o)
        if (question.isOpen && question.options.every(o => o.option !== values[question.title])) {
          question.options.push({ option: values[question.title], votes: 1, custom: true })
        }
      } else if (question.type === 'Checkboxes') {
        question.options.map(o => values[question.title][o.option] === true ? o.votes += 1 : o)
        const optionNames = Object.getOwnPropertyNames(values[question.title])
        if (question.isOpen) {
          for (let i = 0; i < optionNames.length;i++) {
            const name = optionNames[i]
            if (question.options.every(o => o.option !== name)) {
              question.options.push({ option: name, votes: 1, custom: true })
            }
          }
        }
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

export const editSurvey = (values) => {
  return async dispatch => {
    const data = surveyService.update(values)
    dispatch({
      type: 'EDIT_SURVEY',
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

export const resetSurvey = (survey) => {
  return async dispatch => {
    survey.questions.map(q => q.options.map(o => o.votes = 0))
    const toReset = { ...survey, answers: 0 }
    const data = await surveyService.update(toReset)
    dispatch({
      type: 'RESET_SURVEY',
      data
    })
  }
}

export const sortSurveys = (sort) => {
  let data
  if (sort === 'byLeastAnswers') {
    data = byLeastAnswers
  } else if (sort === 'byUser') {
    data = byUser
  } else {
    data = byMostAnswers
  }
  return async dispatch => {
    dispatch({
      type: 'SORT_SURVEYS',
      data
    })
  }
}

export default reducer