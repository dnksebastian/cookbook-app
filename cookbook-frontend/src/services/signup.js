import axios from 'axios'

const baseURL = '/api/users'

const signup = async data => {
  const response = await axios.post(baseURL, data)
  console.log(response.data);
  return response.data
}

export default { signup }