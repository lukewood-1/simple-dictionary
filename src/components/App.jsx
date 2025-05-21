import { useState } from 'react';
import '../App.css';
import AppText from '../assets/AppText';
import Context from '../context';
import { RouterProvider } from 'react-router-dom';
import routes from '../assets/routes';

function App() {
  const [language, setLanguage] = useState(navigator.language.slice(0, 2));
  const book = JSON.parse(AppText)[language.slice(0,2)].App;

  return (
    <Context.Provider value={{language, setLanguage, AppText}}>
      <h1>{book.headline}</h1>
      <h2>{book.subheadline}</h2>
      <RouterProvider router={routes} />
    </Context.Provider>
  )
}

export default App