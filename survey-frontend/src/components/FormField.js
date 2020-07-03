import React from 'react'
import { Form, Dropdown } from 'semantic-ui-react'

export const TextField = ({ input, placeholder, label, meta: { touched, error } }) => (
  <Form.Field>
    <label style={{fontSize: '16px'}}>{label}</label>
    <input {...input} type='text' style={{marginBottom: '5px'}} placeholder={placeholder}/>
    {touched && error && <div style={{color: 'red'}}>{error}</div>}
  </Form.Field>
)

export const PasswordField = ({ input, placeholder, label, meta: { touched, error } }) => (
  <Form.Field>
    <label style={{fontSize: '16px'}}>{label}</label>
    <input {...input} type='password' style={{marginBottom: '5px'}} placeholder={placeholder}/>
    {touched && error && <div style={{color: 'red'}}>{error}</div>}
  </Form.Field>
)

export const SelectField = props => (
    <Form.Field>
      <label style={{fontSize: '16px'}}>{props.label}</label>
      <Dropdown selection {...props.input}
                value={props.input.value}
                onChange={(param,data) => props.input.onChange(data.value)}
                placeholder={props.label}
                options={props.options}
                style={{marginBottom: '5px'}}
       />
       {props.meta.touched && props.meta.error && <div style={{color: 'red'}}>{props.meta.error}</div>}
     </Form.Field>
)