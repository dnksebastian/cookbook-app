// Styles
import './App.css'

// Core
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Pages and components
import ErrorPage from "./pages/Error/ErrorPage.jsx";
import Home from './pages/Home/Home.jsx';
import NewRecipe from './pages/NewRecipe/NewRecipe.jsx';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails.jsx';
import Search from './pages/Search/Search.jsx';

// Setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/new",
    element: <NewRecipe />,
  },
  {
    path: "/details/:id",
    element: <RecipeDetails />,
  },
  {
    path: "/search",
    element: <Search />,
  },
]);

// Render

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
