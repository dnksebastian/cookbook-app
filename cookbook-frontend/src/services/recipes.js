import axios from 'axios';

// Routes
const baseURL = '/api/recipes'

let token

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
};


const getAll = () => {
    const req = axios.get(baseURL);
    return req.then(res => res.data);
};

const getSingle = (id) => {
    const req = axios.get(`${baseURL}/${id}`);
    return req.then(res => res.data);
};

const getFiltered = (query) => {
    const req = axios.get(`${baseURL}?q=${query}`);
    return req.then(res => res.data);
};

const addRecipe = async (recipeObj) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseURL, recipeObj, config);
    return response.data;
};

const removeRecipe = async (id) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.delete(`${baseURL}/${id}`, config);
    return response.data
};

const updateRecipe = (id, updatedRecipe) => {
    return axios.put(`${baseURL}/${id}`, updatedRecipe)
};

const recipeServices = {
    getAll,
    getSingle,
    getFiltered,
    addRecipe,
    updateRecipe,
    removeRecipe,
    setToken
}

export default recipeServices