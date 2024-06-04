import React from 'react';
import { useLoaderData } from 'react-router-dom';

import './Users.scss';

const Users: React.FC = () => {
  const users = useLoaderData();

  return (
    <div className='users'>
      <h2>Available Users:</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>E-mail</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user, i) => (
              <tr>
                <td>{++i}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

export async function loader() {
  const response = await fetch('http://localhost:8080/admin/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users.');
  } else {
    const resData = await response.json();
    return resData.users;
  }
}
