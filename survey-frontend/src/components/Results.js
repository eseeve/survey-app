import React from 'react'
import { useSelector  } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Button, Header, Grid } from 'semantic-ui-react'
import Chart from "react-google-charts"

const Question = ({ question, total }) => {
  let data = question.options.map(o => {
    return [
      o.option,
      o.votes
    ]
  })
  data.unshift(['Option', 'Votes'])
  if (question.type === 'MultipleChoice') {
    return (
      <div>
        <h4>{question.title}</h4>
        <div>{total} responses</div>
        <Chart
          width={'500px'}
          height={'300px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          options={{
            tooltip: { trigger: 'selection' },
          }}
          data={data}
        />
      </div>
    )
  }
  
  return (
    <div>
      <h4>{question.title}</h4>
      <div>{total} responses</div>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        options={{
          legend: { position: 'none' },
        }}
        data={data}
      />
    </div>
  )
}

const Questions = ({ questions, total }) => {
  return (
    <div>
      {questions.map(q =>
        <Question key={q.title} question={q} total={total} />
      )}
    </div>
  )
}

const Results = () => {
  const surveys = useSelector(state => state.surveys)
  const history = useHistory()

  const id = useParams().id
  const survey = surveys.find(s => s.id === id)

  const handleClick = () => {
    history.push('/')
  }

  if (!survey) {
    return null
  }

  const total = survey.answers

  return(
    <div>
      <Grid style={{paddingTop: '10px', marginBottom: '10px'}} columns={2}>
        <Grid.Column >
          <Header as='h1' >{survey.name}</Header>
        </Grid.Column>
        <Grid.Column >
          <Button floated='right' primary size='small' type='button' onClick={handleClick} >
            Home
          </Button>
        </Grid.Column>
      </Grid>
      {total === 0 ? <div style={{marginBottom: '10px'}}>No answers yet.</div> : <Questions questions={survey.questions} total={total}/>}
      <div>Created by {survey.user.name}</div>
    </div>
  )
}

export default Results
