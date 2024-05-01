import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Page from './components/pages/HomePage';
import Teas from './components/pages/Teas';
import Extras from './components/pages/Extras';
import About from './components/pages/About';
import Blog from './components/pages/Blog';
import Contact from './components/pages/Contact';
import ProductDetails from './components/pages/ProductDetails';
import CartPage from './components/pages/CartPage';

import RootLayout from './components/pages/RootLayout';
import ErrorPage from './components/pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Page /> },
      { path: '/teas', element: <Teas /> },
      { path: '/teas/:productLink', element: <ProductDetails /> },
      { path: '/extras', element: <Extras /> },
      { path: '/extras/:productLink', element: <ProductDetails /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/about', element: <About /> },
      { path: '/blog', element: <Blog /> },
      { path: '/contact', element: <Contact /> },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
