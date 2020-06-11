import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

import { removeSurvey } from '../reducers/surveyReducer'

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

const Survey = ({ handleSubmit, pristine, submitting }) => {
  const surveys = useSelector(state => state.surveys)
  const dispatch = useDispatch()
  const history = useHistory()

  const id = useParams().id
  const survey = surveys.find(s => s.id === id)

  const handleClick = () => {
    dispatch(removeSurvey(survey))
    history.push('/')
  }

  if (!survey) {
    return null
  }

  return (
    <div>
      <h1>{survey.name}</h1>
      <form onSubmit={handleSubmit}>
        <Questions questions={survey.questions} />
        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
        </div>
      </form>
      <div>times answered: {survey.answers}</div>
      <button onClick={handleClick}>Remove Survey</button>
    </div>
  )
}

export default reduxForm({
  form: 'survey'
})(Survey)