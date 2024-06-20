import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Page from './components/pages/HomePage'
import Teas from './components/pages/Teas'
import Extras from './components/pages/Extras'
import About from './components/pages/About'
import Blog from './components/pages/Blog'
import Contact from './components/pages/Contact'
import ProductDetails from './components/pages/ProductDetails'
import CartPage from './components/pages/CartPage'

import RootLayout from './components/pages/RootLayout'
import ErrorPage from './components/pages/Error'
import AdminPanel from './components/admin/AdminPanel'
import AdminLayout from './components/admin/AdminLayout'
import Products, { loader as productsLoader } from './components/admin/Products'
import ProductForm from './components/admin/ProductForm'
import Users, { loader as usersLoader } from './components/admin/Users'
import Orders from './components/admin/Orders'
import AdminProductDetails from './components/admin/AdminProductDetails'
import EditProduct from './components/admin/EditProduct'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import EditUser from './components/admin/EditUser'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Page /> },
            { path: 'teas', element: <Teas /> },
            { path: 'teas/:productLink', element: <ProductDetails /> },
            { path: 'extras', element: <Extras /> },
            { path: 'extras/:productLink', element: <ProductDetails /> },
            { path: 'cart', element: <CartPage /> },
            { path: 'about', element: <About /> },
            { path: 'blog', element: <Blog /> },
            { path: 'contact', element: <Contact /> },
            { path: 'login', element: <Login /> },
            { path: 'signup', element: <Signup /> },
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            { index: true, element: <AdminPanel /> },
            {
                path: 'products',
                element: <Products />,
                loader: productsLoader,
            },
            { path: 'product', element: <ProductForm isEdit={false} /> },
            { path: ':productId', element: <AdminProductDetails /> },
            { path: ':productId/edit', element: <EditProduct /> },
            { path: 'users', element: <Users />, loader: usersLoader },
            { path: ':userId/edit-user', element: <EditUser /> },
            { path: 'orders', element: <Orders /> },
        ],
    },
])

const App: React.FC = () => {
    return <RouterProvider router={router} />
}

export default App
