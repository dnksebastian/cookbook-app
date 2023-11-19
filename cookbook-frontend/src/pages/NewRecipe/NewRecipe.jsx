import './NewRecipe.css';
import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import recipeServices from '../../services/recipes'

const NewRecipe = () => {

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [cookingTime, setCookingTime] = useState('')

  const [isSuccess, setIsSuccess] = useState(false)

  const ingredientInput = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipeObj = {
      title,
      ingredients,
      method,
      cookingTime: `${cookingTime} minutes`
    }

    try {
      await recipeServices.addRecipe(newRecipeObj);
      await recipeServices.getAll();
      setIsSuccess(true);
    }
    catch (err) {
      console.log(err);
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

  return (
    <div className='create'>
      <h2 className='page-title'>Add a new recipe</h2>


      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
            ref={ingredientInput}
            type="text"
            onChange={(e) => setNewIngredient(e.target.value)}
            value={newIngredient}
            />
            <button
            className='btn'
            onClick={handleAdd}
            >Add</button>
          </div>
        </label>
        <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

        <label>
          <span>Recipe method:</span>
          <textarea
          onChange={(e) => setMethod(e.target.value)}
          value={method}
          required
          />
        </label>
        <label>
          <span>Cooking time (minutes):</span>
          <input type="number"
          onChange={(e) => setCookingTime(e.target.value)}
          value={cookingTime}
          required
          />
        </label>
        <button className='btn'>Submit</button>
      </form>
    </div>
  )
}

export default NewRecipe