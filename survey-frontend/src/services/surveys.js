import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/surveys'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const answer = async (id) => {
  const survey = await axios.get(`${baseUrl}/${id}`)
  const object = { ...survey.data, answers: survey.data.answers + 1 }
  const response = await axios.put(`${baseUrl}/${id}`, object)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, create, answer, remove, }
