import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Segment, Button } from 'semantic-ui-react'

const Surveys = () => {
  const surveys = useSelector(state => state.surveys)

  if (!surveys) {
    return null
  }

  if (surveys.length === 0) {
    return <div>No surveys yet</div>
  }

  return(
    <div>
      <Segment.Group>
        {surveys.map(survey =>
            <Segment key={survey.id} >
              {survey.name} 
              <Button primary as={Link} to={`/surveys/${survey.id}`} floated='right'>Take survey</Button>
              <p style={{marginTop: '3px'}}><Link to={`/surveys/${survey.id}/results`}>Results</Link></p>
            </Segment>
          )}
      </Segment.Group>
    </div>
  )
}

export default Surveys

