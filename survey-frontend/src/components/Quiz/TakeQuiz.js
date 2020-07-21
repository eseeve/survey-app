import React from 'react'
import { useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'

const Option = ({ option, title }) => {
  return (
    <div style={{marginTop: '5px'}}>
      <label>
        <Field
          className='survey-radio'
          name={`${title}`}
          component='input'
          type='radio'
          value={option.option}
        />{' '} {option.option}
      </label>
    </div>
  )
}

const Question = ({ question }) => {
  return (
    <div style={{marginTop: '10px', marginBottom: '10px'}}>
      <strong style={{fontSize: '16px'}}>{question.title}</strong>
      <div>
      {question.options.filter(o => !o.custom).map(o =>
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
      <div key={q.title}>
        <Question question={q} />
      </div>
      )}
    </div>
  )
}

const TakeQuiz = ({ quiz, handleSubmit, submitting, error }) => {
  const theme = useSelector(state => state.theme)
  const color = theme === 'dark' ? 'teal' : 'red'

  if (!quiz) {
    return null
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Questions questions={quiz.questions} />
        {error && <div style={{color}}>{error}</div>}
        <div style={{ marginBottom: '10px'}}>
          <Button className='green-button' color='green' size='small' style={{marginTop: '10px'}} type='submit' disabled={submitting}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default reduxForm({
  form: 'takequiz'
})(TakeQuiz)