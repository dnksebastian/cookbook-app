import './ErrorPage.css'

import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  
  return (
    <div id='error-page'>
      <h1>Something went wrong!</h1>
      <p>Sorry, an error has occured.</p>
      <p>
      <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

export default ErrorPage