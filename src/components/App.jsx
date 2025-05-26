import { RouterProvider } from 'react-router-dom';
import AppText from '../assets/AppText';
import routes from '../assets/routes';
import Settings from './Settings';

function App() {
  const book = JSON.parse(AppText).en.App;
  return (
    <>
      <header>
        <div className="logo">Logo</div>
        <Settings/>
      </header>
      <h1>{book.headline}</h1>
      <h2>{book.subheadline}</h2>
      <RouterProvider router={routes} />
    </>
  )
}

export default App