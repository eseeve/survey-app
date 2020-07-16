import React from 'react'
import { useSelector } from 'react-redux'
import { Field, FieldArray, reduxForm  } from 'redux-form'
import { Button, Form, Segment, Icon, Grid } from 'semantic-ui-react'

import { TextField } from '../FormField'
import validate from './validate'

const Options = ({ fields, meta: { error } }) => (
  <div>
    <Grid columns={2}>
    {fields.map((option, index) => (
        <Grid.Row key={index}>
          <Grid.Column>
          <Field
            name={`${option}.option`}
            placeholder={`option ${index + 1}`}
            component={TextField}
          />
          </Grid.Column>
          <Grid.Column>
            <Button icon style={{marginTop: '7px'}} size='tiny' type='button' onClick={() => fields.remove(index)}>
              <Icon name='close' />
            </Button>
          </Grid.Column>
        </Grid.Row>
        )
      )}
    </Grid>
    <Button id='add-option' size='tiny' style={{marginTop: '20px'}} type='button' onClick={() => fields.push()}>
        Add Option
    </Button>
  </div>
)

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
              placeholder='Question Title'
              component={TextField}
              label='Question Title'
            />
          </Grid.Column>
          <Grid.Column>
            <Button className='red-button' icon floated='right' size='tiny' color='red' type='button' onClick={() => fields.remove(index)}>
              <Icon name='trash' />
            </Button>
          </Grid.Column>
          </Grid.Row>
          </Grid>
          <FieldArray name={`${question}.options`} component={Options} />
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

const QuizForm = ({ handleSubmit, pristine, reset, submitting }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name='name'
        label='Quiz name'
        placeholder='Quiz name'
        component={TextField}
      />
      <FieldArray name='questions' component={Questions} />
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