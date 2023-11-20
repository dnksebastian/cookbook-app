import './UserRecipes.css'

// import { Link } from 'react-router-dom';

// import { useTheme } from '../../hooks/useTheme';
import { useAuthContext } from '../../hooks/useAuthContext'

import RecipeCard from '../RecipeCard/RecipeCard';

// import Trashcan from '../../assets/Trashcan.svg';


const UserRecipes = ({recipes, handleRemove}) => {

  // const { mode } = useTheme();
  const userData = useAuthContext();
  const user = userData.user;

  const recipesByUser = recipes.filter(r => r.user?.username === user?.username);

  if (recipesByUser.length === 0) {
    return <div className='error'>No recipes to load...</div>
  }

    
  return (
    <div className='user-recipes-list'>
        {recipesByUser.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} handleRemove={handleRemove} />)}
    </div>
  )
}

export default UserRecipes