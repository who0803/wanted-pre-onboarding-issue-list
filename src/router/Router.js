import { Navigate, createBrowserRouter } from 'react-router-dom';
import IssueList from '../pages/IssueList';
import IssueDetail from '../pages/IssueDetail';
import NotFoundPage from '../pages/NotFoundPage';
import { Root } from './Root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Navigate to={'/repos/facebook/react/issues'} />,
      },
      {
        path: '/repos/:owner/:repo/issues',
        element: <IssueList />,
      },
      {
        path: '/repos/:owner/:repo/issues/:id',
        element: <IssueDetail />,
      }
    ],
    errorElement: <NotFoundPage />,
  },
]);