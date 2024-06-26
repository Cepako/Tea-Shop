import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import dashboardIcon from '../../assets/dashboard-icon.svg'
import productsIcon from '../../assets/products-icon.svg'
import addProductIcon from '../../assets/add-product-icon.svg'
import usersIcon from '../../assets/users-icon.svg'
import ordersIcon from '../../assets/orders-icon.svg'
import logoutIcon from '../../assets/logout-icon.svg'
import { useAppDispatch } from '../../redux/hooks'
import { logout } from '../../redux/auth'

import './AdminNavigation.scss'

const AdminNavigation: React.FC = () => {
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <nav>
            <h2>
                <Link to="/admin">
                    <img src={dashboardIcon} alt="dashboard icon" />
                    Dashboard
                </Link>
            </h2>
            <ul>
                <li>
                    <NavLink to="products">
                        <img src={productsIcon} alt="products icon" />
                        Available products
                    </NavLink>
                </li>
                <li>
                    <NavLink to="product">
                        <img src={addProductIcon} alt="add product icon" />
                        Add product
                    </NavLink>
                </li>
                <li>
                    <NavLink to="users">
                        <img src={usersIcon} alt="users icon" />
                        Users
                    </NavLink>
                </li>
                <li>
                    <NavLink to="orders">
                        <img src={ordersIcon} alt="orders icon" />
                        Orders
                    </NavLink>
                </li>
                <li className="logout">
                    <NavLink to="/login" onClick={handleLogout}>
                        <img src={logoutIcon} alt="logout icon" />
                        Log out
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default AdminNavigation
