import React from 'react'

const Question = ({ question, answers }) => {
  if (answers[question.title] === question.options[question.correct].option) {
    return (
      <h4>{question.title} correct</h4>
    )
  }
  return (
    <h4>{question.title} incorrect</h4>
  )
}

const Score = ({ quiz, answers }) => {
  return (
    <div>
      <h3>Total Points: {quiz.scores[quiz.scores.length - 1]} / {quiz.questions.length}</h3>
        {quiz.questions.map(q => 
          <Question key={q.id} question={q} answers={answers} />
        )}
    </div>
  )
}

export default Score