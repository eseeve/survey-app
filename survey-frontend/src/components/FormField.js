import React from 'react'
import { Form } from 'semantic-ui-react'

export const TextField = ({ input, label, meta: { touched, error } }) => (
  <Form.Field>
    <label>{label}</label>
    <input {...input} type='text' style={{marginBottom: '5px'}}/>
    <span style={{color: 'red'}}>{touched && error && <div>{error}</div>}</span>
  </Form.Field>
)