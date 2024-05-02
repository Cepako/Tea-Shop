import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavigation from './AdminNavigation';

import './AdminLayout.scss';

const AdminLayout: React.FC = () => {
  return (
    <>
      <div className='admin-panel'>
        <AdminNavigation />
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
