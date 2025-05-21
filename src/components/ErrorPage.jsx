import Context from "../context";
import { useContext, useNavigate } from "react";

function ErrorPage(){
  const { language, AppText } = useContext(Context);
  const book = AppText[language].ErrorPage;
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