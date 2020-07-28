import axios from 'axios'

const baseUrl = '/api/sendmail'

const send = async (mailData) => {
  const response = await axios.post(baseUrl, mailData)
  return response.data
}

export default { send }