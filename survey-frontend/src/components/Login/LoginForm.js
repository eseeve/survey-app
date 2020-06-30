import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'
import { TextField, PasswordField } from '../FormField'

const LoginForm = ({ handleSubmit, submitting }) => {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
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
        <Button primary size='small' type='submit' disabled={submitting}>
          Login
        </Button>
      </Form>
    </div>
  )
}

export default reduxForm({
  form: 'loginForm'
})(LoginForm)