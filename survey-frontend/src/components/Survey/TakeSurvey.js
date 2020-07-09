import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Button, Input } from 'semantic-ui-react'

const CheckBoxesOption = ({ option, title }) => {
  return (
    <div style={{marginTop: '5px'}}>
      <label>
        <Field
          name={`${title}.${option.option}`}
          component='input'
          type='checkbox'
        />{' '}
        {option.option}
      </label>
    </div>
  )
}

const CheckBoxesQuestion = ({ question }) => {
  const [ open, setOpen ] = useState('')
  const [ option, setOption] = useState('')

  const handleOptionAdd = () => {
    if (open.trim().length === 0) return
    setOpen('')
    setOption(open)
  }
  return (
    <div style={{marginTop: '10px', marginBottom: '10px'}}>
      <strong style={{fontSize: '16px'}}>{question.title}</strong>
      <div>
        {question.options.filter(o => !o.custom).map(o =>
          <CheckBoxesOption key={o.option} option={o} title={question.title}/>
        )}
      </div>
      {(question.isOpen && option === '') && (
        <div style={{marginTop: '5px'}}>
          <Input
            placeholder='Other...'
            value={open}
            onChange={(e) => setOpen(e.target.value)}
          />
          <Button style={{marginLeft: '5px'}} size='tiny' onClick={handleOptionAdd}>Add</Button>
          </div>
      )}
      {(question.isOpen && option !== '') && (
        <div style={{marginTop: '5px'}}>
           <label>
            <Field
              name={`${question.title}.${option}`}
              component='input'
              type='checkbox'
            />{' '}
            {option}
          </label>
        </div>
      )}
    </div>
  )
}

const MultipleChoiceOption = ({ option, title }) => {
  return (
    <div style={{marginTop: '5px'}}>
      <label>
        <Field
          className='survey-radio'
          name={`${title}`}
          component='input'
          type='radio'
          value={option.option}
        />{' '}
        {option.option}
      </label>
    </div>
  )
}

const MultipleChoiceQuestion = ({ question }) => {
  const [ open, setOpen ] = useState('')
  const [ option, setOption] = useState('')

  const handleOptionAdd = () => {
    if (open.trim().length === 0) return
    setOpen('')
    setOption(open)
  }


  return (
    <div style={{marginTop: '10px', marginBottom: '10px'}}>
      <strong style={{fontSize: '16px'}}>{question.title}</strong>
      <div>
        {question.options.filter(o => !o.custom).map(o =>
          <MultipleChoiceOption key={o.option} option={o} title={question.title}/>
        )}
      </div>
      {(question.isOpen && option === '') && (
        <div style={{marginTop: '5px'}}>
          <Input
            placeholder='Other...'
            value={open}
            onChange={(e) => setOpen(e.target.value)}
          />
          <Button style={{marginLeft: '5px'}} size='tiny' onClick={handleOptionAdd}>Add</Button>
          </div>
      )}
      {(question.isOpen && option !== '') && (
        <div style={{marginTop: '5px'}}>
          <label>
            <Field
              className='survey-radio'
              name={`${question.title}`}
              component='input'
              type='radio'
              value={option}
            />{' '}
            {option}
          </label>
        </div>
      )}
    </div>
  )
}

const Questions = ({ questions }) => {
  return (
    <div>
      {questions.map(q =>
        q.type === 'MultipleChoice'
        ? <MultipleChoiceQuestion key={q.title} question={q} />
        : <CheckBoxesQuestion key={q.title} question={q} />
      )}
    </div>
  )
}

const TakeSurvey = ({ survey, handleSubmit, submitting, error }) => {
  const theme = useSelector(state => state.theme)
  const color = theme === 'dark' ? 'teal' : 'red'

  if (!survey) {
    return null
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Questions questions={survey.questions} />
        {error && <div style={{color}}>{error}</div>}
        <div>
          <Button className='green-button' color='green' size='small' style={{marginTop: '10px'}} type='submit' disabled={submitting}>
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