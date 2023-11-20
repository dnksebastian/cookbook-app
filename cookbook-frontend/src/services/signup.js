import axios from 'axios'

const baseURL = '/api/users'

let token

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
};

const signup = async data => {
  const response = await axios.post(baseURL, data)
  console.log(response.data);
  return response.data
}

const removeUser = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  console.log(config);

  const response = await axios.delete(`${baseURL}/${id}`, config);
  return response.data
};

export default { signup, removeUser, setToken }