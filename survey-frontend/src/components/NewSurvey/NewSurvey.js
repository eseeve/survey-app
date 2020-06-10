import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import validate from './validate'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} />
      {touched && error && <div>{error}</div>}
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
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Question
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
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
)

const NewSurvey = ({ handleSubmit, pristine, reset, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        type="text"
        label="Survey name"
        component={renderField}
      />
      <FieldArray name="questions" component={renderQuestions} />
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'survey',
  validate
})(NewSurvey)