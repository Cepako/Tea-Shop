import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import './Users.scss'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import User from './admin-components/User'

const Users: React.FC = () => {
    const initialUsers = useLoaderData()
    const [users, setUsers] = useState(initialUsers)

    useEffect(() => {
        setUsers(initialUsers)
    }, [initialUsers])

    const refreshUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/admin/users')
            if (!response.ok) {
                throw new Error('Failed to fetch users')
            }
            const resData = await response.json()
            setUsers(resData.users)
        } catch (error) {
            console.error(error)
        }
    }
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
        })
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
        })
    }
    let usersTable = null
    if (Array.isArray(users)) {
        usersTable = (
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>E-mail</th>
                        <th>User Name</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => (
                        <User
                            number={++i}
                            key={user._id}
                            details={user}
                            onProductDeleted={refreshUsers}
                            notifySuccess={notifySuccess}
                            notifyError={notifyError}
                        />
                    ))}
                </tbody>
            </table>
        )
    }
    return (
        <>
            <div className="users">
                <h2>Available Users:</h2>
                {usersTable}
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
                transition={Zoom}
            />
        </>
    )
}

export default Users

export async function loader() {
    const response = await fetch('http://localhost:8080/admin/users')
    if (!response.ok) {
        throw new Error('Failed to fetch users.')
    } else {
        const resData = await response.json()
        return resData.users
    }
}
