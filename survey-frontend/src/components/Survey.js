import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Question = ({ question }) => {
  return (
    <div>
      <h4>{question.title}</h4>
      <ul>
        {question.options.map(o =>
          <li key={o}>{o}</li>
        )}
      </ul>
    </div>
  )
}

const Questions = ({ questions }) => {
  return (
    <div>
      {questions.map(q =>
        <Question key={q.title} question={q} />
      )}
    </div>
  )
}

const Survey = () => {
  const surveys = useSelector(state => state.surveys)

  const id = useParams().id
  const survey = surveys.find(s => s.id === id)

  if (!survey) {
    return null
  }

  return (
    <div>
      <h2>{survey.name}</h2>
      <Questions questions={survey.questions} />
    </div>
  )
}

export default Survey