import './EditRecipe.css'

import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import recipeServices from '../../services/recipes'

import { useNotificationContext } from '../../hooks/useNotification'

import RemoveIcon from '../../assets/remove-icon.svg';


const EditRecipe = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [recipe, setRecipe] = useState({});

  const [isSuccess, setIsSuccess] = useState(false)

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [cookingTime, setCookingTime] = useState('')

  const ingredientInput = useRef(null);
  const navigate = useNavigate();

  const notificationControl = useNotificationContext()

  useEffect(() => {
    setIsLoading(true);

    recipeServices
    .getSingle(id)
    .then(receivedRecipe => {
      setRecipe(receivedRecipe)

      setTitle(receivedRecipe.title)
      setIngredients(receivedRecipe.ingredients)
      setMethod(receivedRecipe.method)
      setCookingTime(receivedRecipe.cookingTime)
      
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

    const ing = newIngredient.trim();
    
    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    setNewIngredient('');

    ingredientInput.current.focus();
  };

  const handleRemoveIngredient = (e) => {
    e.preventDefault()

    const ingredientWrap = e.target.closest('.ingredient-helper');
    const ingredientEl = ingredientWrap.querySelector('.ingredient-el').textContent.trim();

    const newIngredients = ingredients.filter(i => i !== ingredientEl);

    setIngredients(newIngredients)

    ingredientInput.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedRecipeObj = {
      title,
      ingredients,
      method,
      cookingTime
    }

    try {
      await recipeServices.updateRecipe(recipe.id ,editedRecipeObj);
      // await recipeServices.getAll()
      setIsSuccess(true);
    } catch (err) {
      notificationControl.displayNotification({
        type: 'error',
        message: 'Could not edit recipe. Please check your input or login again.'
      })
      console.log(err);
    }

  };

  useEffect(() => {
    if(isSuccess) {
      navigate('/')
    }
  }, [isSuccess, navigate]);
    
  return (
    <div className="edit-recipe-wrap">
      {isError && <p className='edit-form-error error-msg'>{isError}</p>}
      {isLoading && <p className='edit-form-loading loading-msg'><span className='loader'></span></p>}

      {recipe &&
      <div className='edit-form-wrapper'>
      <h2 className="edit-recipe-heading">Edit recipe</h2>
      <form
      className="edit-recipe-form"
      onSubmit={handleSubmit}
      >
        <label className='edit-label'>
          <span>Recipe title</span>
          <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          minLength={5}
          required
          />
        </label>

        <div className="edit-recipe-input-helper">
        <label className='edit-label'>
          <span>Recipe ingredients (one at a time):</span>
          <div className="ingredients-helper">
            <input
            ref={ingredientInput}
            type="text"
            onChange={(e) => setNewIngredient(e.target.value)}
            value={newIngredient}
            />
            <button
            className='btn edit-recipe-ingredient-btn'
            onClick={handleAddIngredient}
            >Add</button>
          </div>
        </label>
        <div className='ingredients-info'>
          <p className='edit-cig-label'>Current ingredients:</p>
          {ingredients?.map(i =>
            <div className='ingredient-helper' key={i}>
              <p className='ingredient-el'>{i}</p> <img src={RemoveIcon} alt="Remove icon" className="ingredient-remove" onClick={handleRemoveIngredient}/>
            </div>)
            }
        </div>
        </div>

        <label className='edit-label'>
          <span>Recipe method:</span>
          <textarea
          onChange={(e) => setMethod(e.target.value)}
          value={method}
          required
          />
        </label>
        <label className='edit-label'>
          <span>Cooking time (minutes):</span>
          <input
          type="number"
          onChange={(e) => setCookingTime(e.target.value)}
          value={cookingTime}
          required
          />
        </label>
        <button className='btn edit-recipe-submit'>Submit</button>
      </form>
      </div>}
    </div>
  )
}

export default EditRecipe