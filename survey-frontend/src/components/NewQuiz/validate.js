const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (values.name && values.name.length < 3) {
    errors.name = 'Survey name too short'
  }
  if ((!values.questions || !values.questions.length) && (!values.linearScales || !values.linearScales.length)) {
    errors.questions = { _error: 'At least one question must be entered' }
  } else if (values.questions){
    const questionsArrayErrors = []
    values.questions.forEach((question, questionIndex) => {
      const questionErrors = {}
      if (!question || !question.title) {
        questionErrors.title = 'Required'
        questionsArrayErrors[questionIndex] = questionErrors
      }
      if (!question || !question.type) {
        questionErrors.type = 'Required'
        questionsArrayErrors[questionIndex] = questionErrors
      }
    })
    if (questionsArrayErrors.length) {
      errors.questions = questionsArrayErrors
    }
  }
  return errors
}

export default validate