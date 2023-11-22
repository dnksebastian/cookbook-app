import './RecipeCard.css'

import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';


import Trashcan from '../../assets/trashcan.svg';
import Cogs from '../../assets/editing.svg';

const RecipeCard = ({recipe, handleRemove}) => {
    const userData = useAuthContext();
    const user = userData.user;

  return (
    <div className='recipe-card'>
        <h3 className='recipe-card-title'>{recipe?.title}</h3>
        <p className="recipe-card-time">{recipe?.cookingTime} minutes to make</p>
        <p className="recipe-card-desc">{recipe?.method.substring(0, 100)}...</p>
        <Link
        to={`/details/${recipe?.id}`}
        className='recipe-card-link'
        >Cook This</Link>
        {recipe?.user?.username === user?.username ?
        <div className="card-controls">
          <img 
                className="card-control delete-recipe"
                src={Trashcan} alt="delete icon"
                onClick={() => handleRemove(recipe?.id)}
          />
          <Link to={`/details/edit/${recipe?.id}`}>
          <img 
                className="card-control edit-recipe"
                src={Cogs} alt="edit icon"
          />
          </Link>
        </div> : ''}
    </div>
  )
}

export default RecipeCard