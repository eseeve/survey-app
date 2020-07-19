import React from 'react'
import { useDispatch } from 'react-redux'
import { sortSurveys } from '../reducers/surveyReducer'
import { setFilter } from '../reducers/filterReducer'
import { Input, Dropdown } from 'semantic-ui-react'
import { sortQuizzes } from '../reducers/quizReducer'

const SearchBar = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  const handleSort = (e, { value }) => {
    dispatch(sortSurveys(value))
    dispatch(sortQuizzes(value))
  }

  const options = [
    { key: 1, text: 'Most Responses', value: 'byMostAnswers' },
    { key: 2, text: 'Least Responses', value: 'byLeastAnswers' },
    { key: 3, text: 'Users', value: 'byUser' },
  ]

  return (
    <div style={{marginBottom: '10px'}}>
      <Input style={{marginRight: '10px'}} placeholder='Search...' onChange={handleChange} />
      <Dropdown text='Sort by' options={options} onChange={handleSort} />
    </div>
  )
}

export default SearchBar