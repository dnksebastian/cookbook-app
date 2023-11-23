/* eslint-disable react/no-unescaped-entities */

import './Search.css'

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

import recipeServices from '../../services/recipes';

// import RecipeList from '../../components/RecipeList/RecipeList';
import UserRecipes from '../../components/UserRecipes/UserRecipes';

const Search = () => {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [recipes, setRecipes] = useState([]);


  useEffect(() => {
    setIsLoading(true);

    recipeServices
    .getFiltered(query)
    .then(receivedRecipe => {
      setRecipes(receivedRecipe)
      setIsError('')
      setIsLoading(false)
    })
    .catch (err => {
      console.log(err.message);
      setIsError('Something went wrong...');
      setIsLoading(false);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  const handleRemove = async (id) => {
    try {
      setIsLoading(true)
      await recipeServices.removeRecipe(id)
      const newRecipes = await recipeServices.getFiltered(query)
      setRecipes(newRecipes)
      setIsError('')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  };


  return (
    <div className='search-results-page'>
      <h2 className="search-page-title">Recipes including "{query}"</h2>

      {isError && <p className='search-error-msg error-msg'>{isError}</p>}
      {isLoading && <p className='search-loading-msg loading-msg'><span className='loader'></span></p>}

      {recipes && <UserRecipes recipes={recipes} handleRemove={handleRemove}/>}
    </div>
  )
}

export default Search