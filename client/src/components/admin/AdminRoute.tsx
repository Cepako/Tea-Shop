import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'

interface AdminRoutesProps {
    element: React.ElementType

    [key: string]: any
}

const AdminRoute: React.FC<AdminRoutesProps> = ({
    element: Element,
    ...rest
}) => {
    const user = useAppSelector((state) => state.auth.user)
    console.log(user)

    return user && user.role === 'admin' ? (
        <Element {...rest} />
    ) : (
        <Navigate to="/login" replace />
    )
}

export default AdminRoute
