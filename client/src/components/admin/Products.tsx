import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Product from './admin-components/Product';

import './Products.scss';

const Products: React.FC = () => {
  const initialProducts = useLoaderData();
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const refreshProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const resData = await response.json();
      setProducts(resData.products);
    } catch (error) {
      console.error(error);
    }
  };
  const notifySuccess = (message: string) =>
    toast.success(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Zoom,
    });
  const notifyError = (errorMessage: string) => {
    toast.error(errorMessage, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Zoom,
    });
  };

  let productsTable = null;
  if (Array.isArray(products)) {
    productsTable = (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th>Type</th>
            <th>Group</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, i) => (
            <Product
              number={++i}
              key={prod._id}
              details={prod}
              onProductDeleted={refreshProducts}
              notifySuccess={notifySuccess}
              notifyError={notifyError}
            />
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <>
      <div className='products'>
        <h2>Available Products:</h2>

        {productsTable}
      </div>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme='dark'
        transition={Zoom}
      />
    </>
  );
};

export default Products;

export async function loader() {
  const response = await fetch('http://localhost:8080/admin/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  } else {
    const resData = await response.json();
    return resData.products;
  }
}
