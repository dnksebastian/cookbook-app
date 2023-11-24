import './UserRecipes.css'

import { useAuthContext } from '../../hooks/useAuthContext'

import RecipeCard from '../RecipeCard/RecipeCard';

const UserRecipes = ({recipes, handleRemove}) => {

  const userData = useAuthContext();
  const user = userData.user;

  const recipesByUser = recipes.filter(r => r.user?.username === user?.username);

  if (recipesByUser.length === 0) {
    return <div className='error-empty'>
      <p>No recipes to load...</p>
    </div>
  }

    
  return (
    <div className='user-recipes-list'>
        {recipesByUser.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} handleRemove={handleRemove} />)}
    </div>
  )
}

export default UserRecipes