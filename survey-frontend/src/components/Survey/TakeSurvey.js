import React from 'react'
import { Field, reduxForm } from 'redux-form'

const Option = ({ option, title }) => {
  return (
    <div>
      <label>
        <Field
          name={title}
          component="input"
          type="radio"
          value={option.option}
        />{' '}
        {option.option}
      </label>
    </div>
  )
}

const Question = ({ question }) => {
  return (
    <div>
      <label>{question.title}</label>
      <div>
        {question.options.map(o =>
          <Option key={o.option} option={o} title={question.title}/>
        )}
      </div>
    </div>
  )
}

const Questions = ({ questions }) => {
  return (
    <div>
      {questions.map(q =>
        <Question key={q.title} question={q} />
      )}
    </div>
  )
}

const TakeSurvey = ({ survey, handleSubmit, pristine, submitting }) => {

  if (!survey) {
    return null
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Questions questions={survey.questions} />
        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
        </div>
      </form>
      <div>times answered: {survey.answers}</div>
    </div>
  )
}

export default reduxForm({
  form: 'takeSurvey'
})(TakeSurvey)