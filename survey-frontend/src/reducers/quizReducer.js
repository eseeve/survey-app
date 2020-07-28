import quizService from '../services/quiz'

const byMostAnswers = (q1, q2) => q2.answers - q1.answers
const byLeastAnswers = (q1, q2) => q1.answers - q2.answers
const byUser = (q1, q2) => q1.user.name.localeCompare(q2.user.name)


const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_QUIZZES':
    return action.data.sort(byMostAnswers)
  case 'SORT_QUIZZES':
    return state.sort(action.data)
  case 'CREATE_QUIZ':
    return [...state, action.data]
  case 'ANSWER_QUIZ':
    return state.map(q => q.id === action.data.id ? action.data : q).sort(byMostAnswers)
  case 'EDIT_QUIZ':
    return state.map(q => q.id === action.data.id ? action.data : q).sort(byMostAnswers)
  case 'REMOVE_QUIZ':
    return state.filter(q => q.id !== action.quiz.id)
  case 'RESET_QUIZ':
    return state.map(s => s.id === action.data.id ? action.data : s).sort(byMostAnswers)
  default:
    return state
  }
}

export const initializeQuizzes = () => {
  return async dispatch => {
    const quizzes = await quizService.getAll()
    dispatch({
      type: 'INIT_QUIZZES',
      data: quizzes,
    })
  }
}

export const createQuiz = (quiz) => {
  return async dispatch => {
    const data = await quizService.create(quiz)
    dispatch({
      type: 'CREATE_QUIZ',
      data
    })
  }
}

export const answerQuiz = (quiz, values) => {
  return async dispatch => {
    quiz.questions.map(question => 
      question.options.map(o => values[question.title] === o.option ? o.votes += 1 : o))
    const toAnswer = { ...quiz, answers: quiz.answers + 1 }
    const data = await quizService.update(toAnswer)
    dispatch({
      type: 'ANSWER_QUIZ',
      data
    })
  }
}

export const editQuiz = (quiz) => {
  return async dispatch => {
    const data = quizService.update(quiz)
    dispatch({
      type: 'EDIT_QUIZ',
      data
    })
  }
}


export const removeQuiz = (quiz) => {
  return async dispatch => {
    const data = await quizService.remove(quiz.id)
    dispatch({
      type: 'REMOVE_QUIZ',
      data,
      quiz
    })
  }
}

export const resetQuiz = (quiz) => {
  return async dispatch => {
    quiz.questions.map(q => q.options.map(o => o.votes = 0))
    const toReset = { ...quiz, answers: 0 }
    const data = await quizService.update(toReset)
    dispatch({
      type: 'RESET_QUIZ',
      data
    })
  }
}

export const sortQuizzes = (sort) => {
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
      type: 'SORT_QUIZZES',
      data
    })
  }
}

export default reducer