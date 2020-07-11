import React from 'react'
import { useDispatch } from 'react-redux'
import { sortSurveys } from '../reducers/surveyReducer'
import { setFilter } from '../reducers/filterReducer'
import { Input, Dropdown } from 'semantic-ui-react'

const SearchBar = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))

  }

  const handleSort = (e, { value }) => {
    dispatch(sortSurveys(value))
  }

  const style = {
    marginBottom: 10
  }

  const options = [
    { key: 1, text: 'Most Responses', value: 'byMostAnswers' },
    { key: 2, text: 'Least Responses', value: 'byLeastAnswers' },
    { key: 3, text: 'Users', value: 'byUser' },
  ]

  return (
    <div style={style}>
      <Input style={{marginRight: '10px'}} placeholder='Search Surveys' onChange={handleChange} />
      <Dropdown text='Sort by' options={options} onChange={handleSort} />
    </div>
  )
}

export default SearchBar