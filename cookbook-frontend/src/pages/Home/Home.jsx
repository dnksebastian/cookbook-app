import './Home.css';
import { useEffect, useState } from 'react';

import recipeServices from '../../services/recipes';

import RecipeList from '../../components/RecipeList/RecipeList';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    recipeServices
    .getAll()
    .then(receivedRecipes => {
      setRecipes(receivedRecipes)
      setIsError('')
      setIsLoading(false)
    })
    .catch (err => {
      console.log(err.message);
      setIsError('Something went wrong...');
      setIsLoading(false);
    })
  }, [])


  // console.log(recipes);

  return (
    <div className='home'>
      {isError && <p className='error-msg'>{isError}</p>}
      {isLoading && <p className='loading-msg'>Loading...</p>}

      {recipes && <RecipeList recipes={recipes} />}
    </div>
  )

}

export default Home