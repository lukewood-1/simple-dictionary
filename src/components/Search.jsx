import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AppText from '../assets/AppText';

const Search = () => {
  const [input, setInput] = useState('')

  useEffect(() => {
    const inputForm = document.getElementById('termSearch');
    inputForm.focus();
  })

  const navigate = useNavigate();

  const book = JSON.parse(AppText)['en'].SearchForm;

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
    <div className='search'>
      <label htmlFor="termSearch">{book.label_termSearch}</label>
      <input type="text" id="termSearch" placeholder={book.input_placeholder} value={input} onChange={handleInput} onKeyDown={onEnter}/>
      <button onClick={onClick}>{book.button_search}</button>
      <button><Link to='/'>{book.button_back}</Link></button>
    </div>
  )
}


export default Search
