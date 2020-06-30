import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'

import { TextField, PasswordField } from '../FormField'
import validate from './validate'

const UserForm = ({ handleSubmit, submitting }) => {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Field
          name='name'
          label='Name'
          placeholder='Name'
          component={TextField}
        />
        <Field
          name='username'
          label='Username'
          placeholder='Username'
          component={TextField}
        />
        <Field
          name='password'
          label='Password'
          placeholder='Password'
          component={PasswordField}
        />
        <Field
          name='confirmPassword'
          label='Confirm Password'
          placeholder='Confirm Password'
          component={PasswordField}
        />
        <Button primary size='small' type='submit' disabled={submitting}>
          Sign up
        </Button>
      </Form>
    </div>
  )
}

export default reduxForm({
  form: 'userForm',
  validate
})(UserForm)