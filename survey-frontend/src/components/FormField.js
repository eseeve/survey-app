import React from 'react'
import { Form, Dropdown } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

export const TextField = ({ input, placeholder, label, meta: { touched, error } }) => {
  const theme = useSelector(state => state.theme)
  const color = theme === 'dark' ? 'teal' : 'red'
  return (
    <Form.Field>
      <label style={{fontSize: '16px'}}>{label}</label>
      <input id={input.name} {...input} type='text' style={{marginBottom: '5px'}} placeholder={placeholder}/>
      {touched && error && <div className='error' style={{color}}>{error}</div>}
    </Form.Field>
  )
}
  

export const PasswordField = ({ input, placeholder, label, meta: { touched, error } }) => {
  const theme = useSelector(state => state.theme)
  const color = theme === 'dark' ? 'teal' : 'red'
  return (
    <Form.Field>
      <label style={{fontSize: '16px'}}>{label}</label>
      <input id={input.name} {...input} type='password' style={{marginBottom: '5px'}} placeholder={placeholder}/>
      {touched && error && <div className='error' style={{color}}>{error}</div>}
    </Form.Field>
  )
}

export const SelectField = props => {
  const theme = useSelector(state => state.theme)
  const color = theme === 'dark' ? 'teal' : 'red'
  return(
    <Form.Field>
      <label style={{fontSize: '16px'}}>{props.label}</label>
      <Dropdown
        className='dropdown-menu'
        selection {...props.input}
        value={props.input.value}
        onChange={(param,data) => props.input.onChange(data.value)}
        placeholder={props.label}
        options={props.options}
        style={{marginBottom: '5px'}}
      />
      {props.meta.touched && props.meta.error && <div className='error' style={{color}}>{props.meta.error}</div>}
     </Form.Field>
)
}