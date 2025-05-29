import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AppText from '../assets/AppText';

const Search = () => {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const inputForm = document.getElementById('termSearch');
    inputForm.focus();
  })

  const navigate = useNavigate();

  const book = JSON.parse(AppText)['en'].SearchForm;

  function handleInput(e){
    setSearchInput(e.target.value);
  }

  function onEnter(e){
    if(e.key === 'Enter' && searchInput.length > 0){
      navigate('meaning/:' + searchInput);
    }
  }

  function onClick(){
    if(searchInput.length > 0){
      navigate('meaning/:' + searchInput)
    }
  }

  return (
    <div className='search'>
      <label htmlFor="termSearch">{book.label_termSearch}</label>
      <input type="text" id="termSearch" placeholder={book.input_placeholder} value={searchInput} onChange={handleInput} onKeyDown={onEnter}/>
      <button onClick={onClick}>{book.button_search}</button>
      <button><Link to='/'>{book.button_back}</Link></button>
    </div>
  )
}

export default Search;
