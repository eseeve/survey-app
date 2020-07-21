import React from 'react'
import { useSelector  } from 'react-redux'
import { Header, Icon, Checkbox } from 'semantic-ui-react'

const IncorrectAnswer = ({ option, answer, correctAnswer }) => {
  if (answer === option.option) {
    return (
      <Checkbox radio label={option.option} readOnly defaultChecked/>
    )
  } else if (correctAnswer === option.option) {
    return (
      <Checkbox radio label={option.option.concat(' ' + String.fromCharCode(10003))} readOnly/>
    )
  }
  return (
    <Checkbox radio label={option.option} readOnly/>
  )
}

const CorrectAnswer = ({ option, correctAnswer }) => {
  if (correctAnswer === option.option) {
    return (
      <Checkbox radio label={option.option.concat(' ' + String.fromCharCode(10003))} readOnly defaultChecked/>
    )
  }
  return (
    <Checkbox radio label={option.option} readOnly/>
  )
}

const Question = ({ question, answers }) => {
  const theme = useSelector(state => state.theme)

  const correctAnswer = question.options[question.correct].option
  const answer = answers[question.title]

  const correctColor = theme === 'dark' ? 'pink' : 'green'
  const incorrectColor = theme === 'dark' ? 'teal' : 'red'

  if (answer === correctAnswer) {
    return (
      <div style={{marginBottom: '10px'}}>
        <Header as='h4'><Icon className='score-icon' color={correctColor} name='check' />{question.title} 1/1</Header>
        {question.options.map(o =>
          <div key={o.option}>
            <CorrectAnswer option={o} title={question.title} correctAnswer={correctAnswer}/><br/>
          </div>
        )}
      </div>
    )
  }
  return (
    <div style={{marginBottom: '10px'}}> 
      <Header as='h4'><Icon className='score-icon' color={incorrectColor} name='close' />{question.title} 0/1</Header>
      {question.options.map(o =>
        <div key={o.option}>
          <IncorrectAnswer option={o} title={question.title} answer={answer} correctAnswer={correctAnswer}/><br/>
        </div>
      )}
    </div>
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