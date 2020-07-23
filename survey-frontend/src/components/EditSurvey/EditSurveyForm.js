import React, { useEffect } from 'react'
import { useSelector, connect } from 'react-redux'
import { Field, FieldArray, reduxForm  } from 'redux-form'
import { useParams, Link } from 'react-router-dom'
import { Button, Form, Segment, Icon, Grid } from 'semantic-ui-react'

import { TextField, SelectField, TextAreaField } from '../FormField'
import { load as loadSurvey } from '../../reducers/loadSurvey'
import validate from './validate'

const LinearScales = ({ fields, meta: { error, submitFailed }, touched }) =>  {
  const theme = useSelector(state => state.theme)
  const color = theme === 'dark' ? 'teal' : 'red'
  return (
    <div>
      {fields.map((question, index) => (
        <Segment key={index}>
          <Grid columns={2} style={{marginBottom: '10px'}}>
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
          <Grid.Row>
          <Grid.Column>
            <Field 
              name={`${question}.beginning`} 
              component={SelectField} 
              label='Beginning'
              options={[
                {
                  text: '0',
                  value: 0,
                  key: '0',
                },
                {
                  text: '1',
                  value: 1,
                  key: '1',
                },
              ]}
            >
            </Field>
            {touched && error && <div className='error' style={{color}}>{error}</div>}
          </Grid.Column>
          <Grid.Column>
            <Field 
              name={`${question}.end`} 
              component={SelectField} 
              label='End'
              options={[
                {
                  text: '2',
                  value: 2,
                  key: '2',
                },
                {
                  text: '3',
                  value: 3,
                  key: '3',
                },
                {
                  text: '4',
                  value: 4,
                  key: '4',
                },
                {
                  text: '5',
                  value: 5,
                  key: '5',
                },
                {
                  text: '6',
                  value: 6,
                  key: '6',
                },
                {
                  text: '7',
                  value: 7,
                  key: '7',
                },
                {
                  text: '8',
                  value: 8,
                  key: '8',
                },
                {
                  text: '9',
                  value: 9,
                  key: '9',
                },
                {
                  text: '10',
                  value: 10,
                  key: '10',
                },
              ]}
            >
            </Field>
            {touched && error && <div className='error' style={{color}}>{error}</div>}
          </Grid.Column>
          </Grid.Row>
          </Grid>
        </Segment>
      )
    )}
    <Button id='add-linear' size='small' type='button' style={{marginBottom: '10px'}} onClick={() => fields.push({})}>
      Add Linear Scale
    </Button>
    {submitFailed && error && <div className='error' style={{color, marginBottom: '10px'}}>{error}</div>}
  </div>
  )
}

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
            <Field 
              name={`${question}.type`} 
              component={SelectField} 
              label='Question Type'
              options={[
                {
                  text: 'Multiple Choice',
                  value: 'MultipleChoice',
                  key: 'MultipleChoice',
                },
                {
                  text: 'Checkboxes',
                  value: 'Checkboxes',
                  key: 'Checkboxes',
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
          <FieldArray name={`${question}.options`} component={Options} />
          {question.type !== 'LinearScale' && 
          <div style={{ paddingTop: '10px' }}>
            <label>
              <Field
                id='make-open'
                name={`${question}.isOpen`}
                component="input"
                type="checkbox"
              />{' '}
              Add 'other'
            </label>
          </div>
          }
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

let EditSurveyForm = ({ handleSubmit, load, pristine, reset, submitting }) => {
  const surveys = useSelector(state => state.surveys)

  const id = useParams().id
  const survey = surveys.find(s => s.id === id)

  useEffect(() => {
    load(survey)
  }, [load, survey])

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name='name'
        label='Survey name'
        placeholder='Survey name'
        component={TextField}
      />
      <Field
        name='description'
        label='Survey description (optional)'
        placeholder='Survey description'
        component={TextAreaField}
      />
      <FieldArray name='questions' component={Questions} />
      <FieldArray name='linearScales' component={LinearScales} />
      <div style={{ marginBottom: '10px'}}>
        <Button className='green-button' id='submit' color='green' size='small' type='submit' disabled={submitting}>
          Submit
        </Button>
        <Button className='red-button' floated='right' color='red' size='small' type='button' as={Link} to={'/surveys'}>
          Discard Changes
        </Button>
      </div>
    </Form>
  )
}

EditSurveyForm = reduxForm({
  form: 'editsurvey',
  validate
})(EditSurveyForm)

EditSurveyForm = connect(
  state => ({
    initialValues: state.editSurvey.data
  }),
  { load: loadSurvey }
)(EditSurveyForm)

export default EditSurveyForm