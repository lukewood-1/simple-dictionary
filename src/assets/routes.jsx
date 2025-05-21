import { createBrowserRouter } from 'react-router-dom';
import Settings from '../components/Settings';
import EnglishDic from '../components/EnglishDic';
import PortugueseDic from '../components/PortugueseDic';
import Portal from '../components/Portal';
import Meaning from '../components/Meaning'
import Search from '../components/Search';
import ErrorPage from '../components/ErrorPage'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Portal />,
    errorElement: <ErrorPage />
  },
  {
    path: 'settings',
    element: <Settings />
  },
  {
    path: 'pt',
    element: <PortugueseDic />,
    children: [
      {
        index: true,
        element: <Search />
      },
      {
        path: 'meaning/:term',
        element: <Meaning />
      }
    ]
  },
  {
    path: 'en',
    element: <EnglishDic />,
    children: [
      {
        index: true,
        element: <Search />
      },
      {
        path: 'meaning/:term',
        element: <Meaning />
      }
    ]
  }
])

export default routes