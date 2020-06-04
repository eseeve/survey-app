import React from 'react'

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

const Survey = ({ survey }) => {
  return (
    <div>
      <h2>{survey.name}</h2>
      <Questions questions={survey.questions} />
    </div>
  )
}

export default Survey