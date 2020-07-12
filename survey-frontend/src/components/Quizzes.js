import React from 'react'
import { useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

const Quizzes = () => {
  const quizzes = useSelector(state => state.quizzes)
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
        <div>No quizzes found.</div>
      </div>
    )
  }

  return(
    <div>
      <Segment.Group>
        {quizzes.map(quiz =>
            <Segment key={quiz.id} >
              {quiz.name}
              <div>Created by {quiz.user.name}</div>
            </Segment>
          )}
      </Segment.Group>
    </div>
  )
}

export default Quizzes

