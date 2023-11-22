import './RecipeDetails.css'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import recipeServices from '../../services/recipes'
// import { useTheme } from '../../hooks/useTheme'


const RecipeDetails = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [recipe, setRecipe] = useState({});

  // const { mode } = useTheme()

  useEffect(() => {
    setIsLoading(true);

    recipeServices
    .getSingle(id)
    .then(receivedRecipe => {
      setRecipe(receivedRecipe)
      setIsError('')
      setIsLoading(false)
    })
    .catch (err => {
      console.log(err.message);
      setIsError('Something went wrong...');
      setIsLoading(false);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className={`recipe-details-page`}>
      {isError && <p className='error-msg details-error-msg'>{isError}</p>}
      {isLoading && <p className='loading-msg details-loading-msg'><span className='loader'></span></p>}

      {recipe && 
        <div className='recipe-details-wrap'>
        <h2 className="recipe-details-title">{recipe.title}</h2>
        <p>Takes <b>{recipe.cookingTime}</b> minutes to cook.</p>
        <ul>
          {recipe.ingredients && recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
        </ul>
        <p className="method">{recipe.method}</p>
        </div>
      }
    </div>
  )
}

export default RecipeDetails