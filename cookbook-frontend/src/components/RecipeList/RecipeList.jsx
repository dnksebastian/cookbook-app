import { useTheme } from '../../hooks/useTheme';
import './RecipeList.css'

import { Link } from 'react-router-dom';

import Trashcan from '../../assets/Trashcan.svg';

const RecipeList = ({ recipes }) => {

  const { mode } = useTheme()

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
                <img 
                  className="delete"
                  src={Trashcan} alt="delete icon" 
          />
            </div>
        ))}
    </div>
  )
}

export default RecipeList