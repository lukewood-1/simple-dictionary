import { RouterProvider } from 'react-router-dom';
import AppText from '../assets/AppText';
import routes from '../assets/routes';
import Settings from './Settings';

function App() {
  const book = JSON.parse(AppText).en.App;

  return (
    <>
      <header>
        <img className='logo' src="/logo.webp" alt="book" width='50' height='65' />
        <h1>{book.headline}</h1>
        <Settings/>
      </header>
      <RouterProvider router={routes} />
      <footer>
        <p>Made by <a href="https://github.com/lukewood-1" rel='noopener noreferrer' target='_blank'>LukeWood</a></p>
      </footer>
    </>
  )
}

export default App