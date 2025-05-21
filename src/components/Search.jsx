import { useContext, useState } from 'react';
import Context from '../context';
import { Link, useNavigate } from "react-router-dom";

const Search = () => {
  const { language, AppText } = useContext(Context)
  const [input, setInput] = useState('')

  const navigate = useNavigate();

  const book = JSON.parse(AppText)[language.slice(0,2)].SearchForm;

  function handleInput(e){
    setInput(e.target.value);
  }

  function onEnter(e){
    if(e.key === 'Enter' && input.length > 0){
      navigate('meaning/:' + input);
    }
  }

  function onClick(){
    if(input.length > 0){
      navigate('meaning/:' + input)
    }
  }

  return (
    <div>
      <label htmlFor="termSearch">{book.label_termSearch}</label>
      <input type="text" id="termSearch" placeholder={book.input_placeholder} value={input} onChange={handleInput} onKeyDown={onEnter}/>
      <button onClick={onClick}>{book.button_search}</button>
      <button><Link to='/'>{book.button_back}</Link></button>
    </div>
  )
}


export default Search
