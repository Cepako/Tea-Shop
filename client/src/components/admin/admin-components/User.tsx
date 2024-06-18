import React, { useRef } from 'react'
import Modal, { ModalMethods } from '../../Modal'
import { useNavigate } from 'react-router-dom'
import './Product.scss'
import './User.scss'

interface ProductProps {
    number: number
    details: {
        _id: string
        email: string
        contact: string
        name: string
        address: string
    }
    onProductDeleted: () => void
    notifySuccess: (message: string) => void
    notifyError: (message: string) => void
}

const User: React.FC<ProductProps> = ({
    number,
    details,
    onProductDeleted,
    notifySuccess,
    notifyError,
}) => {
    const { _id, name, email, contact, address } = details

    const dialog = useRef<ModalMethods>(null)

    const navigate = useNavigate()

    const handleEditButton = () => {
        navigate(`/admin/${_id}/edit-user`)
    }

    const handleDeleteButton = async () => {
        try {
            const res = await fetch(`http://localhost:8080/admin/user/${_id}`, {
                method: 'DELETE',
            })
            if (!res.ok) {
                notifyError('Failed to delete user.')
                throw new Error('Failed to delete user')
            }

            const resData = await res.json()
            onProductDeleted()

            notifySuccess(resData.message)
        } catch (err) {
            notifyError('Failed to delete user. Please try again later.')
        }
        dialog.current?.close()
    }
    return (
        <>
            <Modal className="user-modal" ref={dialog} closeButtonValue="Close">
                <h2>Are you sure you want to delete this user?</h2>
                <button className="delete" onClick={handleDeleteButton}>
                    Confirm
                </button>
            </Modal>
            <tr key={email} className="admin-user">
                <td>{number}</td>
                <td>{email}</td>
                <td>{name}</td>
                <td>{contact}</td>
                <td>{address}</td>
                <td>
                    <button onClick={handleEditButton}>Edit</button>
                </td>
                <td>
                    <button onClick={() => dialog.current?.open()}>
                        Delete
                    </button>
                </td>
            </tr>
        </>
    )
}

export default User
