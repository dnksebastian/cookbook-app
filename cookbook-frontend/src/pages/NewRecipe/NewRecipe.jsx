import './NewRecipe.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import recipeServices from '../../services/recipes'
import { useNotificationContext } from '../../hooks/useNotification';

import RemoveIcon from '../../assets/remove-icon.svg'

const NewRecipe = () => {

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [cookingTime, setCookingTime] = useState('')

  const [isSuccess, setIsSuccess] = useState(false)

  const ingredientInput = useRef(null);

  const navigate = useNavigate();
  const notificationControl = useNotificationContext()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipeObj = {
      title,
      ingredients,
      method,
      cookingTime
    }

    try {
      await recipeServices.addRecipe(newRecipeObj);
      await recipeServices.getAll();
      setIsSuccess(true);
    }
    catch (err) {
      notificationControl.displayNotification({
        type: 'error',
        message: 'Could not add recipe. Please check your input.'
      })
    }
  }

  useEffect(() => {
    if(isSuccess) {
      navigate('/')
    }
  }, [isSuccess, navigate]);

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    
    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    setNewIngredient('');

    ingredientInput.current.focus();
  };

  const handleRemove = (e) => {
    e.preventDefault()

    const ingredientWrap = e.target.closest('.new-ingredient-helper');
    const ingredientEl = ingredientWrap.querySelector('.new-ingredient-el').textContent.trim();

    const newIngredients = ingredients.filter(i => i !== ingredientEl);

    setIngredients(newIngredients)

    ingredientInput.current.focus();
  };

  return (
    <div className='new-recipe-page-wrap'>
      <h2 className='new-recipe-page-title'>Add a new recipe</h2>


      <form className='new-recipe-form' onSubmit={handleSubmit}>
        <label className='new-rec-label'>
          <span>Recipe title:</span>
          <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          minLength={5}
          required
          />
        </label>

        <div className="new-input-helper">
        <label className='new-rec-label'>
          <span>Recipe ingredients (one at a time):</span>
          <div className="new-ingredients-helper">
            <input
            ref={ingredientInput}
            type="text"
            onChange={(e) => setNewIngredient(e.target.value)}
            value={newIngredient}
            />
            <button
            className='btn btn-add-new-ingredient'
            onClick={handleAdd}
            >Add</button>
          </div>
        </label>

        <div className="new-ingredients-info">
        <p className='new-cig-label'>Current ingredients:</p>
          {ingredients?.map(i =>
            <div className='new-ingredient-helper' key={i}>
              <p className='new-ingredient-el'>{i}</p> <img src={RemoveIcon} alt="Remove icon" className="new-ingredient-remove" onClick={handleRemove}/>
            </div>)
            }
        </div>
        </div>

        <label className='new-rec-label'>
          <span>Recipe method:</span>
          <textarea
          onChange={(e) => setMethod(e.target.value)}
          value={method}
          required
          />
        </label>
        <label className='new-rec-label'>
          <span>Cooking time (minutes):</span>
          <input type="number"
          onChange={(e) => setCookingTime(e.target.value)}
          value={cookingTime}
          required
          />
        </label>
        <button className='btn new-recipe-submit-btn'>Submit</button>
      </form>
    </div>
  )
}

export default NewRecipe