import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'

import { PasswordField } from '../FormField'
import validate from './validate'

const UserForm = ({ handleSubmit, submitting }) => {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Field
          name='password'
          label='New Password'
          placeholder='Password'
          component={PasswordField}
        />
        <Field
          name='confirmPassword'
          label='Confirm New Password'
          placeholder='Confirm Password'
          component={PasswordField}
        />
        <Button style={{marginBottom: '10px'}} className='green-button' color='green' size='small' type='submit' disabled={submitting}>
          Change Password
        </Button>
      </Form>
    </div>
  )
}

export default reduxForm({
  form: 'editUser',
  validate
})(UserForm)