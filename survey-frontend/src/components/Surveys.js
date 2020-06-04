import React from 'react'
import { useSelector } from 'react-redux'

import Survey from './Survey'

const Surveys = () => {
  const surveys = useSelector(state => state)

  if (!surveys) {
    return null
  }

  return(
    <div>
      {surveys.map(survey =>
        <Survey
          key={survey.id}
          survey={survey}
        />
      )}
    </div>
  )

}

export default Surveys

