import './Home.css';
import { useEffect, useState } from 'react';

import recipeServices from '../../services/recipes';

// import RecipeList from '../../components/RecipeList/RecipeList';
import UserRecipes from '../../components/UserRecipes/UserRecipes';

import { useNotificationContext } from '../../hooks/useNotification';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  const [recipes, setRecipes] = useState([]);

  const notificationControl = useNotificationContext()

  const handleRemove = async (id) => {
    try {
      setIsLoading(true)
      await recipeServices.removeRecipe(id)
      const newRecipes = await recipeServices.getAll()
      setRecipes(newRecipes)
      setIsError('')
      setIsLoading(false)
      notificationControl.displayNotification({
        type: 'info',
        message: 'Recipe has been removed!'
      })
    } catch (error) {
      setIsLoading(false)
      notificationControl.displayNotification({
        type: 'error',
        message: 'Could not remove recipe. Please relogin and try again.'
      })
      console.log(error);
    }
  };

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
      {isError && <p className='error-msg home-error-msg'>{isError}</p>}
      {isLoading && <p className='loading-msg home-loading-msg'><span className="loader"></span></p>}

      {/* {recipes && <RecipeList recipes={recipes} handleRemove={handleRemove}/>} */}
      {recipes && <UserRecipes recipes={recipes} handleRemove={handleRemove}/>}
    </div>
  )

}

export default Home