// Styles
import "./App.css";

// Core
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages and components
import ErrorPage from "./pages/Error/ErrorPage.jsx";
import Home from "./pages/Home/Home.jsx";
import NewRecipe from "./pages/NewRecipe/NewRecipe.jsx";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails.jsx";
import Search from "./pages/Search/Search.jsx";
import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';

import Navbar from "./components/Navbar/Navbar.jsx";
import ThemeSelector from "./components/ThemeSelector/ThemeSelector.jsx";
import Notification from './components/Notification/Notification.jsx';

import { useTheme } from "./hooks/useTheme.js";
import { useAuthContext } from './hooks/useAuthContext.js'


// Render

function App() {
  const { mode } = useTheme()
  const userData = useAuthContext();
  const user = userData.user;

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Notification />
        <Routes>
          <Route
          path="/"
          element={user ? <Home /> : <Navigate to='/login' />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
          path="/new"
          element={user ? <NewRecipe /> : <Navigate to='/login' />}
          />
          <Route
          path="/details/:id"
          element={user ? <RecipeDetails /> : <Navigate to='/login' />}
          />
          <Route
          path="/search"
          element={user ? <Search /> : <Navigate to='/login' />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
