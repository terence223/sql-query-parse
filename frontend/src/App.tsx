import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Index from './pages/Index';

const router = createBrowserRouter([{ path: `/`, element: <Index /> }]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
