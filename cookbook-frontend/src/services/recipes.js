import axios from 'axios';

const baseURL = 'http://localhost:3001/recipes'

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

const addRecipe = (recipeObj) => {
    return axios.post(baseURL, recipeObj)
};

const updateRecipe = (id, updatedRecipe) => {
    return axios.put(`${baseURL}/${id}`, updatedRecipe)
};

const recipeServices = {
    getAll,
    getSingle,
    getFiltered,
    addRecipe,
    updateRecipe
}

export default recipeServices