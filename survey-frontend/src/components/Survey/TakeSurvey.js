import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'

const Option = ({ option, title }) => {
  return (
    <div style={{marginTop: '5px'}}>
      <label>
        <Field
          name={`${title}`}
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
    <div style={{marginTop: '10px', marginBottom: '10px'}}>
      <strong style={{fontSize: '16px'}}>{question.title}</strong>
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

const TakeSurvey = ({ survey, handleSubmit, submitting, error }) => {

  if (!survey) {
    return null
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Questions questions={survey.questions} />
        {error && <div style={{color: 'red'}}>{error}</div>}
        <div>
          <Button primary size='small' style={{marginTop: '10px'}} type="submit" disabled={submitting}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default reduxForm({
  form: 'takeSurvey'
})(TakeSurvey)