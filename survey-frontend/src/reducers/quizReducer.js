import quizService from '../services/quiz'

const byMostAnswers = (q1, q2) => q2.answers - q1.answers

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_QUIZZES':
    return action.data.sort(byMostAnswers)
  case 'CREATE_QUIZ':
    return [...state, action.data]
  case 'ANSWER_QUIZ':
    return state.map(q => q.id === action.data.id ? action.data : q).sort(byMostAnswers)
  case 'REMOVE_QUIZ':
    return state.filter(q => q.id !== action.quiz.id)
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

export default reducer