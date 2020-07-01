import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Segment, Button } from 'semantic-ui-react'

const Surveys = () => {
  const surveys = useSelector(state => state.surveys)
  const users = useSelector(state => state.users)

  if (!surveys || !users) {
    return null
  }

  if (surveys && surveys.forEach(s => s.user !== undefined)) {
    return null
  }

  return(
    <div>
      <Segment.Group>
        {surveys.map(survey =>
            <Segment key={survey.id} >
              {survey.name}
              <Button primary as={Link} to={`/surveys/${survey.id}`} floated='right'>Take survey</Button>
              <div>Created by {survey.user.name}</div>
              <p style={{marginTop: '3px'}}><Link to={`/surveys/${survey.id}/results`}>View results</Link></p>
            </Segment>
          )}
      </Segment.Group>
    </div>
  )
}

export default Surveys

