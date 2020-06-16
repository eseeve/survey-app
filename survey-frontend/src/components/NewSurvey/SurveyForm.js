import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
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
    {error && <li className='error'>{error}</li>}
    <Button size='tiny' style={{marginTop: '20px'}} type='button' onClick={() => fields.push()}>
        Add Option
    </Button>
  </div>
)

const Questions = ({ fields, meta: { error, submitFailed } }) => (
  <div>
    {submitFailed && error && <span>{error}</span>}
      {fields.map((question, index) => (
        <Segment key={index}>
          <Grid columns={2}>
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
            <Button icon floated='right' size='tiny' color='red' type='button' onClick={() => fields.remove(index)}>
              <Icon name='trash' />
            </Button>
          </Grid.Column>
          </Grid.Row>
          </Grid>
          <FieldArray name={`${question}.options`} component={Options} />
        </Segment>
      )
    )}
    <Button primary size='small' type='button' style={{marginBottom: '10px'}} onClick={() => fields.push({})}>
      Add Question
    </Button>
  </div>
)

const SurveyForm = ({ handleSubmit, pristine, reset, submitting }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name='name'
        label='Survey name'
        placeholder='Survey name'
        component={TextField}
      />
      <FieldArray name='questions' component={Questions} />
      <div>
        <Button color='green' size='small' type='submit' disabled={submitting}>
          Submit
        </Button>
        <Button floated='right' color='red' size='small' type='button' disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </div>
    </Form>
  )
}

export default reduxForm({
  form: 'newsurvey',
  validate
})(SurveyForm)