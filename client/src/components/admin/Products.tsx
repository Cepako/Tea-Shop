import React from 'react';
import { useLoaderData } from 'react-router-dom';

import Product from './admin-components/Product';

import './Products.scss';

const Products: React.FC = () => {
  const products = useLoaderData();
  let productsTable = null;
  if (Array.isArray(products)) {
    productsTable = (
      <table>
        <thead>
          <tr>
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
          {products.map((prod) => (
            <Product key={prod._id} details={prod} />
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <div className='products'>
      <h2>Available Products:</h2>

      {productsTable}
    </div>
  );
};

export default Products;

export async function loader() {
  const response = await fetch('http://localhost:8080/admin/products');
  if (!response.ok) {
  } else {
    const resData = await response.json();
    return resData.products;
  }
}
