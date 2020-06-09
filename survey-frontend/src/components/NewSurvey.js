import React from 'react'
import { Field, reduxForm } from 'redux-form'

const NewSurvey = ({ handleSubmit, value }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Survey title</label>
        <div>
          <Field
            name='title'
            component='input'
            type='text'
            placeholder='Survey title'
            value={value}
          />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default reduxForm({
  form: 'survey'
})(NewSurvey)