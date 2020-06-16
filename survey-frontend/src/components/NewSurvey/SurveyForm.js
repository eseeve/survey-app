import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'

import validate from './validate'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label style={{fontSize: '16px'}}>{label}</label>
    <div>
      <input {...input} type={type} style={{marginTop: '5px', marginBottom: '5px'}}/>
      <span style={{color: 'red'}}>{touched && error && <div>{error}</div>}</span>
    </div>
  </div>
)

const renderOptions = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Option
      </button>
    </li>
    {fields.map((option, index) => (
      <li key={index}>
        <Field
          name={`${option}.option`}
          type="text"
          component={renderField}
        />
        <button type="button" onClick={() => fields.remove(index)}>Remove Option</button>
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
)

const renderQuestions = ({ fields, meta: { error, submitFailed } }) => (
  <div>
    <Button primary size='small' type="button" style={{marginTop: '10px'}} onClick={() => fields.push({})}>
      Add Question
    </Button>
    {submitFailed && error && <span>{error}</span>}
    <ul>
      {fields.map((question, index) => (
        <li key={index}>
          <h4>Question #{index + 1}</h4>
          <Field
            name={`${question}.title`}
            type="text"
            component={renderField}
            label="Question Title"
          />
          <button type="button" onClick={() => fields.remove(index)}>Remove Question</button>
          <FieldArray name={`${question}.options`} component={renderOptions} />
        </li>
      ))}
    </ul>
  </div>
)

const SurveyForm = ({ handleSubmit, pristine, reset, submitting }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="name"
        type="text"
        label="Survey name"
        component={renderField}
      />
      <FieldArray name="questions" component={renderQuestions} />
      <div>
        <Button color='green' size='small' type="submit" disabled={submitting}>
          Submit
        </Button>
        <Button floated='right' color='red' size='small' type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </div>
    </Form>
  )
}

export default reduxForm({
  form: 'newsurvey',
  validate
})(SurveyForm)