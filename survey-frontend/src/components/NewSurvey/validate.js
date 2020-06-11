const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (values.name && values.name.length < 3) {
    errors.name = 'Survey name too short'
  }
  if (!values.questions || !values.questions.length) {
    errors.questions = { _error: 'At least one question must be entered' }
  } else {
    const questionsArrayErrors = []
    values.questions.forEach((question, questionIndex) => {
      const questionErrors = {}
      if (!question || !question.title) {
        questionErrors.title = 'Required'
        questionsArrayErrors[questionIndex] = questionErrors
      }
      if (question.title && question.title.length < 3) {
        questionErrors.title = 'Question title too short'
        questionsArrayErrors[questionIndex] = questionErrors
      }
      if (question && question.options && question.options.length) {
        const optionArrayErrors = []
        question.options.forEach((option, optionIndex) => {
          if (!option || !option.length) {
            optionArrayErrors[optionIndex] = 'Required'
          }
        })
        if (optionArrayErrors.length) {
          questionErrors.options = optionArrayErrors
          questionsArrayErrors[questionIndex] = questionErrors
        }
        if (question.options.length > 10) {
          if (!questionErrors.options) {
            questionErrors.options = []
          }
          questionErrors.options._error = 'No more than ten options allowed'
          questionsArrayErrors[questionIndex] = questionErrors
        }
      }
    })
    if (questionsArrayErrors.length) {
      errors.questions = questionsArrayErrors
    }
  }
  return errors
}

export default validate