import axios from 'axios'

const baseURL = '/api/login'

const login = async data => {
  const response = await axios.post(baseURL, data)
  // console.log(response.data);
  return response.data
}

export default { login }