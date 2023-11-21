import './EditRecipe.css'

import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import recipeServices from '../../services/recipes'

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
      {isError && <p className='error-msg'>{isError}</p>}
      {isLoading && <p className='loading-msg'>Loading...</p>}

      {recipe &&
      <>
      <h2 className="edit-recipe-heading">Edit recipe</h2>
      <form
      className="edit-recipe-form"
      onSubmit={handleSubmit}
      >
        <label>
          <span>Recipe title</span>
          <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          />
        </label>

        <div className="input-helper">
        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients-helper">
            <input
            ref={ingredientInput}
            type="text"
            onChange={(e) => setNewIngredient(e.target.value)}
            value={newIngredient}
            />
            <button
            className='btn'
            onClick={handleAddIngredient}
            >Add</button>
          </div>
        </label>
        <div className='ingredients-info'>
          <p>Current ingredients:</p>
          {ingredients?.map(i =>
            <div className='ingredient-helper' key={i}>
              <p className='ingredient-el'>{i}</p> <img src={RemoveIcon} alt="Remove icon" className="ingredient-remove" onClick={handleRemoveIngredient}/>
            </div>)
            }
        </div>
        </div>

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
          <input
          type="number"
          onChange={(e) => setCookingTime(e.target.value)}
          value={cookingTime}
          required
          />
        </label>
        <button
          className='btn'
        >Submit</button>
      </form>
      </>}
    </div>
  )
}

export default EditRecipe