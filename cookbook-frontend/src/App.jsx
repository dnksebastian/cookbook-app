// Styles
import "./App.css";

// Core
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages and components
import ErrorPage from "./pages/Error/ErrorPage.jsx";
import Home from "./pages/Home/Home.jsx";
import NewRecipe from "./pages/NewRecipe/NewRecipe.jsx";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails.jsx";
import Search from "./pages/Search/Search.jsx";

import Navbar from "./components/Navbar/Navbar.jsx";

// Render

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewRecipe />} />
          <Route path="/details/:id" element={<RecipeDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
