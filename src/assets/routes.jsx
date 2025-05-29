import { createBrowserRouter } from 'react-router-dom';
import EnglishDic from '../components/EnglishDic';
import Meaning from '../components/Meaning'
import Search from '../components/Search';
import ErrorPage from '../components/ErrorPage'
import fetcher from './fetcher';

const routes = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <EnglishDic />,
    children: [
      {
        index: true,
        element: <Search />,
      },
      {
        path: 'meaning/:term',
        loader: async ({params}) => {
          return fetcher(params.term);
        },
        element: <Meaning />
      }
    ]
  }
])

export default routes