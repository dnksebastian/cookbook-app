import './RecipeList.css'
import { Link } from 'react-router-dom';

import { useTheme } from '../../hooks/useTheme';
import { useAuthContext } from '../../hooks/useAuthContext'

import Trashcan from '../../assets/Trashcan.svg';


const RecipeList = ({ recipes, handleRemove }) => {

  const { mode } = useTheme();
  const userData = useAuthContext();
  const user = userData.user;
  // console.log(user);
  // console.log(recipes);

  if (recipes.length === 0) {
    return <div className='error'>No recipes to load...</div>
  }

  return (
    <div className='recipe-list'>
        {recipes.map(recipe => (
            <div key={recipe.id} className={`card ${mode}`}>
                <h3>{recipe.title}</h3>
                <p>{recipe.cookingTime} to make.</p>
                <div>{recipe.method.substring(0, 100)}...</div>
                <Link to={`/details/${recipe.id}`}>Cook This</Link>
                {recipe.user?.username === user?.username ?
                <img 
                  className="delete"
                  src={Trashcan} alt="delete icon"
                  onClick={() => handleRemove(recipe.id)}
                />
                : ''}
            </div>
        ))}
    </div>
  )
}

export default RecipeList