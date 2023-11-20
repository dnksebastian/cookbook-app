import './EditRecipe.css'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import recipeServices from '../../services/recipes'


const EditRecipe = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [recipe, setRecipe] = useState({});

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

  const handleAddIngredient = (e) => {
    e.preventDefault();

    console.log('ingredient add');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
  };
    
  return (
    <div className="edit-recipe-wrap">
      {isError && <p className='error-msg'>{isError}</p>}
      {isLoading && <p className='loading-msg'>Loading...</p>}

      {recipe &&
      <>
      <h2 className="edit-recipe-heading">Edit recipe</h2>
      <form
      className="edit-recipe-form"
      onSubmit={handleSubmit}
      disabled
      >
        <label>
          <span>Recipe title</span>
          <input
          type="text"
          disabled
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients-helper">
            <input
            type="text"
            disabled
            />
            <button
            className='btn'
            disabled
            onClick={handleAddIngredient}
            >Add</button>
          </div>
        </label>
        <p>Current ingredients:</p>

        <label>
          <span>Recipe method:</span>
          <textarea
          required
          disabled
          />
        </label>
        <label>
          <span>Cooking time (minutes):</span>
          <input
          type="number"
          required
          disabled
          />
        </label>
        <button
          className='btn'
          disabled
        >Submit</button>
      </form>
      </>}
    </div>
  )
}

export default EditRecipe