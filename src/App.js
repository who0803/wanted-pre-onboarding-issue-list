import { RouterProvider } from 'react-router-dom';
import { router } from './router/Router';

function App() {
  return (
    <div>
      <RouterProvider router={router} />;
    </div>
  )
}

export default App;