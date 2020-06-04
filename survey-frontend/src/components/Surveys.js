import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Surveys = () => {
  const surveys = useSelector(state => state)

  if (!surveys) {
    return null
  }

  return(
    <div>
      <ul>
        {surveys.map(survey =>
          <li key={survey.id}>
            <Link to={`/surveys/${survey.id}`}>{survey.name}</Link>
          </li>
        )}
      </ul>
    </div>
  )

}

export default Surveys

