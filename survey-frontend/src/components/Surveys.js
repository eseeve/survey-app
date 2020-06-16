import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
      <ul>
        {surveys.map(survey =>
          <li key={survey.id}>
            {survey.name} 
            <Link to={`/surveys/${survey.id}`}>Take survey</Link>  
            <Link to={`/surveys/${survey.id}/results`}>Results</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Surveys

