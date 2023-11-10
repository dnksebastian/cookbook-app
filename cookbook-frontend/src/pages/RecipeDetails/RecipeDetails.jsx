import './RecipeDetails.css'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import recipeServices from '../../services/recipes'
import { useTheme } from '../../hooks/useTheme'


const RecipeDetails = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [recipe, setRecipe] = useState({});

  const { mode } = useTheme()

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

  const handleClick = () => {
    // yet to be created...
  }

  return (
    <div className={`recipe ${mode}`}>
      {isError && <p className='error-msg'>{isError}</p>}
      {isLoading && <p className='loading-msg'>Loading...</p>}

      {recipe && 
        <>
        <h2 className="page-title">{recipe.title}</h2>
        <p>Takes {recipe.cookingTime} to cook.</p>
        <ul>
          {recipe.ingredients && recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
        </ul>
        <p className="method">{recipe.method}</p>
        <button onClick={handleClick}>Update me</button>
        </>
      }
    </div>
  )
}

export default RecipeDetails