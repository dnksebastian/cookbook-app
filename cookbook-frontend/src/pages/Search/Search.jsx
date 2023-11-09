/* eslint-disable react/no-unescaped-entities */

import './Search.css'

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

import recipeServices from '../../services/recipes';

import RecipeList from '../../components/RecipeList/RecipeList';

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


  return (
    <div className='search-results'>
      <h2 className="page-title">Recipes including "{query}"</h2>

      {isError && <p className='error-msg'>{isError}</p>}
      {isLoading && <p className='loading-msg'>Loading...</p>}

      {recipes && <RecipeList recipes={recipes}/>}
    </div>
  )
}

export default Search