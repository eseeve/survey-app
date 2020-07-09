import React from 'react'
import { useSelector  } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Header, Grid } from 'semantic-ui-react'
import Chart from "react-google-charts"

import Menu from './Menu'

const Question = ({ theme, question, total }) => {
  let data = question.options.map(o => {
    return [
      o.option,
      o.votes
    ]
  })

  const backgroundColor = theme === 'dark' ? '#111111' : 'white'
  const textColor = theme === 'dark' ? '#eeeeee' : 'black'

  data.unshift(['Option', 'Votes'])
  if (question.type === 'MultipleChoice') {
    return (
      <div>
        <h4>{question.title}</h4>
        <div>{total} responses</div>
        <Chart
          className='chart'
          width={'500px'}
          height={'300px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          options={{
            tooltip: { trigger: 'selection' },
            legend: { textStyle: { color: textColor } },
            backgroundColor
          }}
          data={data}
        />
      </div>
    )
  }
  
  if (question.type === 'LinearScale') {
    return (
      <div>
        <h4>{question.title}</h4>
        <div>{total} responses</div>
        <Chart
          className='chart'
          width={'500px'}
          height={'300px'}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          options={{
            orientation: 'horizontal',
            legend: { position: 'none' },
            hAxis: { textStyle: { color: textColor } },
            vAxis: { textStyle: { color: textColor } },
            backgroundColor
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
        className='chart'
        width={'500px'}
        height={'300px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        options={{
          legend: { position: 'none' },
          hAxis: { textStyle: { color: textColor } },
          vAxis: { textStyle: { color: textColor } },
          backgroundColor
        }}
        data={data}
      />
    </div>
  )
}

const Questions = ({ theme, questions, total }) => {
  return (
    <div>
      {questions.map(q =>
        <Question theme={theme} key={q.title} question={q} total={total} />
      )}
    </div>
  )
}

const Results = () => {
  const surveys = useSelector(state => state.surveys)
  const theme = useSelector(state => state.theme)

  const id = useParams().id
  const survey = surveys.find(s => s.id === id)

  if (!survey) {
    return null
  }

  const total = survey.answers

  return(
    <div>
      <Grid style={{paddingTop: '10px', marginBottom: '10px'}} columns='equal'>
        <Grid.Column width={14} >
          <Header as='h1' >{survey.name}</Header>
        </Grid.Column>
        <Grid.Column style={{marginTop: '5px'}}>
          <Menu link='Home' />
        </Grid.Column>
      </Grid>
      {total === 0 ? <div style={{marginBottom: '10px'}}>No answers yet.</div> : <Questions theme={theme} questions={survey.questions} total={total}/>}
      <div style={{marginBottom: '20px'}}>Created by {survey.user.name}</div>
    </div>
  )
}

export default Results
