import React from 'react'
import { useSelector } from 'react-redux'
import { Field, FieldArray, reduxForm  } from 'redux-form'
import { Button, Form, Segment, Icon, Grid } from 'semantic-ui-react'

import { TextField, SelectField } from '../FormField'
import validate from './validate'

const Questions = ({ fields, meta: { error, submitFailed }, touched }) =>  {
  const theme = useSelector(state => state.theme)
  const color = theme === 'dark' ? 'teal' : 'red'

  return (
    <div>
      {fields.map((question, index) => (
        <Segment key={index}>
          <Grid columns={3} style={{marginBottom: '10px'}}>
          <Grid.Row key={index}>
          <Grid.Column>
            <Field
              name={`${question}.title`}
              placeholder='Question title'
              component={TextField}
              label='Question title'
            />
          </Grid.Column>
          <Grid.Column>
            <Field 
              name={`${question}.correct`} 
              component={SelectField} 
              label='Correct option'
              options={[
                {
                  text: 'A',
                  value: '0',
                  key: '0',
                },
                {
                  text: 'B',
                  value: '1',
                  key: '1',
                },
                {
                  text: 'C',
                  value: '2',
                  key: '2',
                },
                {
                  text: 'D',
                  value: '3',
                  key: '3',
                },
              ]}
            >
            </Field>
            {touched && error && <div className='error' style={{color}}>{error}</div>}
          </Grid.Column>
          <Grid.Column>
            <Button className='red-button' icon floated='right' size='tiny' color='red' type='button' onClick={() => fields.remove(index)}>
              <Icon name='trash' />
            </Button>
          </Grid.Column>
          </Grid.Row>
          </Grid>
          <Field
            name={`${question}.options.0.option`}
            placeholder='Option A'
            component={TextField}
            label='Option A'
          />
          <Field
            name={`${question}.options.1.option`}
            placeholder='Option B'
            component={TextField}
            label='Option B'
          />
          <Field
            name={`${question}.options.2.option`}
            placeholder='Option C'
            component={TextField}
            label='Option C'
          />
          <Field
            name={`${question}.options.3.option`}
            placeholder='Option D'
            component={TextField}
            label='Option D'
          />
        </Segment>
      )
    )}
    <Button id='add-question' size='small' type='button' style={{marginBottom: '10px'}} onClick={() => fields.push({})}>
      Add Question
    </Button>
    {submitFailed && error && <div className='error' style={{color, marginBottom: '10px'}}>{error}</div>}
  </div>
  )
}

const QuizForm = ({ handleSubmit, pristine, reset, submitting, error }) => {
  const theme = useSelector(state => state.theme)
  const color = theme === 'dark' ? 'teal' : 'red'

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name='name'
        label='Quiz name'
        placeholder='Quiz name'
        component={TextField}
      />
      <FieldArray name='questions' component={Questions} />
      {error && <div className='error' style={{color, marginBottom: '10px'}}>{error}</div>}
      <div>
        <Button className='green-button' id='submit' color='green' size='small' type='submit' disabled={submitting}>
          Submit
        </Button>
        <Button className='red-button' floated='right' color='red' size='small' type='button' disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </div>
    </Form>
  )
}

export default reduxForm({
  form: 'newquiz',
  validate
})(QuizForm)