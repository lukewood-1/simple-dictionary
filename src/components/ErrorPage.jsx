import { useNavigate } from "react-router-dom";
import AppText from "../assets/AppText";

function ErrorPage(){
  const book = JSON.parse(AppText).en.ErrorPage;
  const goTo = useNavigate();

  return (
    <div className="error-page">
      <h1>{book.headline}</h1>
      <h2>{book.subheadline}</h2>
      <button onClick={() => goTo('/')}>{book.button_home}</button>
    </div>
  )
}

export default ErrorPage