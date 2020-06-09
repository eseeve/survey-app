import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'

const renderField = ({ input, label, type }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} />
    </div>
  </div>
)

const renderOptions = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Option
      </button>
    </li>
    {fields.map((option, index) => (
      <li key={index}>
        <Field
          name={option}
          type="text"
          component={renderField}
        />
        <button type="button" onClick={() => fields.remove(index)}>Remove Option</button>
      </li>
    ))}
  </ul>
)

const renderQuestions = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Question
      </button>
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

const NewSurvey = ({ handleSubmit }) => {
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
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'survey'
})(NewSurvey)