import React from 'react'
import { Form } from 'semantic-ui-react'

export const TextField = ({ input, placeholder, label, meta: { touched, error } }) => (
  <Form.Field>
    <label style={{fontSize: '16px'}}>{label}</label>
    <input {...input} type='text' style={{marginBottom: '5px'}} placeholder={placeholder}/>
    <span style={{color: 'red'}}>{touched && error && <div>{error}</div>}</span>
  </Form.Field>
)