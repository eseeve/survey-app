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

  if (surveys && surveys.length === 0) {
    return <div>No surveys yet.</div>
  }

  return(
    <div>
      <Segment.Group>
        {surveys.map(survey =>
            <Segment key={survey.id} >
              {survey.name}
              <Button id='take-survey' primary as={Link} to={`/surveys/${survey.id}`} floated='right'>Take survey</Button>
              <div>Created by {survey.user.name}</div>
            </Segment>
          )}
      </Segment.Group>
    </div>
  )
}

export default Surveys

