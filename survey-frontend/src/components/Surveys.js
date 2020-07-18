import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Segment, Button, Header, Grid } from 'semantic-ui-react'

import SearchBar  from './SearchBar'

const SurveyHeader = () => (
  <Grid style={{paddingTop: '10px'}} columns={2}>
    <Grid.Column>
      <Header as='h2' >Surveys</Header>
    </Grid.Column>
    <Grid.Column>
      <Button floated='right' id='quizzes' as={Link} to='/quizzes'>Quizzes</Button>
    </Grid.Column>
  </Grid>
)

const Surveys = () => {
  const surveys = useSelector(state => {
    const filter = state.filter.toLowerCase()
    return state.surveys.filter(s => s.name.toLowerCase().includes(filter) || s.user.name.toLowerCase().includes(filter))
  })
  const users = useSelector(state => state.users)

  if (!surveys || !users) {
    return null
  }
  
  if (surveys && surveys.length === 0) {
    return (
      <div>
        <SurveyHeader />
        <SearchBar />
        <div>No surveys found.</div>
      </div>
    )
  }

  return(
    <div>
      <SurveyHeader />
      <SearchBar />
      <Segment.Group>
        {surveys.map(survey =>
          <Segment key={survey.id}>
            {survey.name}
            <Button className='teal-button' color='teal' id='take-survey' as={Link} to={`/surveys/${survey.id}`} floated='right'>Take survey</Button>
            <div>Created by {survey.user.name}</div>
          </Segment>
          )}
      </Segment.Group>
    </div>
  )
}

export default Surveys

