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
      if (question && question.options && question.options.length) {
        const optionArrayErrors = []
        question.options.forEach((option, optionIndex) => {
          const optionErrors = {}
          if (!option || !option.option) {
            optionErrors.option = 'Required'
            optionArrayErrors[optionIndex] = optionErrors
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
  if (values.linearScales) {
    const questionsArrayErrors = []
    values.linearScales.forEach((question, questionIndex) => {
      const questionErrors = {}
      if (!question || !question.title) {
        questionErrors.title = 'Required'
        questionsArrayErrors[questionIndex] = questionErrors
      }
      if (!question || (question.beginning === undefined)) {
        questionErrors.beginning = 'Required'
        questionsArrayErrors[questionIndex] = questionErrors
      }
      if (!question || !question.end) {
        questionErrors.end = 'Required'
        questionsArrayErrors[questionIndex] = questionErrors
      }
    })
    if (questionsArrayErrors.length) {
      errors.linearScales = questionsArrayErrors
    }
  }
  return errors
}

export default validate