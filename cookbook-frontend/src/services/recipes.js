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

const getFiltered = async (query) => {
    const req = await axios.get(`${baseURL}?q=${query}`);
    return req.data
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

const removeAllByUser = async (userID) => {
    const allRecipesReq = await axios.get(baseURL);
    const allRecipes = allRecipesReq.data;

    const recipesByUser = allRecipes.filter(r => r.user?.id.toString() === userID.toString());

    recipesByUser.forEach(async (recipe) => {
        console.log('removed', recipe.id);
        await removeRecipe(recipe.id);
    })
};

const updateRecipe = async (id, updatedRecipe) => {
    const response = await axios.put(`${baseURL}/${id}`, updatedRecipe);
    return response.data;
};

const recipeServices = {
    getAll,
    getSingle,
    getFiltered,
    addRecipe,
    updateRecipe,
    removeRecipe,
    removeAllByUser,
    setToken
}

export default recipeServices