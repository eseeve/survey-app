import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Segment, Header, Grid, Button } from 'semantic-ui-react'

import SearchBar  from './SearchBar'

const QuizHeader = () => (
  <Grid style={{paddingTop: '10px'}} columns={2}>
    <Grid.Column>
      <Header as='h2' >Quizzes</Header>
    </Grid.Column>
    <Grid.Column>
      <Button floated='right' id='surveys' as={Link} to='/'>Surveys</Button>
    </Grid.Column>
  </Grid>
)

const Quizzes = () => {
  const quizzes = useSelector(state => {
    const filter = state.filter.toLowerCase()
    return state.quizzes.filter(q => q.name.toLowerCase().includes(filter) || q.user.name.toLowerCase().includes(filter))
  })
  const users = useSelector(state => state.users)

  if (!quizzes || !users) {
    return null
  }

  if (quizzes && quizzes.forEach(s => s.user !== undefined)) {
    return null
  }

  if (quizzes && quizzes.length === 0) {
    return (
      <div>
        <QuizHeader />
        <SearchBar />
        <div>No quizzes found.</div>
      </div>
    )
  }

  return(
    <div>
      <QuizHeader />
      <SearchBar />
      <Segment.Group>
        {quizzes.map(quiz =>
            <Segment key={quiz.id} >
              {quiz.name}
              <Button className='teal-button' color='teal' id='take-quiz' as={Link} to={`/quizzes/${quiz.id}`} floated='right'>Take quiz</Button>
              <div>Created by {quiz.user.name}</div>
            </Segment>
          )}
      </Segment.Group>
    </div>
  )
}

export default Quizzes

