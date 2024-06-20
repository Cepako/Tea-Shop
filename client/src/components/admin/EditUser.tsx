import React, {
    FormEvent,
    useEffect,
    useState,
    useRef,
    ChangeEvent,
} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import './EditUser.scss'
import PhoneNumberInput from '../pages/login-components/PhoneNumberInput'
import { toast, ToastContainer, Zoom } from 'react-toastify'

interface UserData {
    email: string
    name: string
    contact: string
    address: string
}

const EditUser: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null)

    const { userId } = useParams()

    const navigate = useNavigate()

    const [userData, setUserData] = useState<UserData>({
        email: '',
        name: '',
        contact: '',
        address: '',
    })
    const [errors, setErrors] = useState({
        name: '',
        contact: '',
        address: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const notifySuccess = () =>
        toast.success('User updated!', {
            position: 'top-center',
            autoClose: 500,
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

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(
                `http://localhost:8080/admin/user/${userId}`
            )
            if (!response.ok) {
            } else {
                const data = await response.json()
                setUserData(data.user)
            }
        }
        fetchUser()
    }, [userId])

    useEffect(() => {
        if (userData.name.trim().length >= 3) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: '',
            }))
        }
        if (userData.contact.replace(/[^0-9]/g, '').slice(2).length === 9) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                contact: '',
            }))
        }
        if (userData.address.length >= 5) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                address: '',
            }))
        }
    }, [userData])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        const newErrors: any = {}
        if (userData.name.trim().length < 3) {
            newErrors.name = 'The name must be at least 3 characters long!'
        }
        if (userData.contact.replace(/[^0-9]/g, '').slice(2).length < 9) {
            newErrors.contact = 'Please enter a valid phone number!'
        }
        if (userData.address.length < 5) {
            newErrors.address = 'Please enter a valid address!'
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setIsSubmitting(false)
            return
        }
        try {
            const fd = new FormData(e.target as HTMLFormElement)
            const response = await fetch(
                `http://localhost:8080/admin/user/${userId}`,
                {
                    method: 'PUT',
                    body: fd,
                }
            )
            if (!response.ok) {
                const errorData = await response.json()
                notifyError(errorData.data[0].msg)
                throw new Error(errorData.data[0].msg)
            }
            notifySuccess()
            setTimeout(() => navigate('/admin/users'), 1000)
        } catch (error) {
            console.error('Failed to edit. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div className="edit-user">
            <h2>
                Edit User: <span className="user-email">{userData.email}</span>
            </h2>
            <form ref={formRef} onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                {errors.name && <p className="invalid">{errors.name}</p>}
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Username"
                    value={userData.name}
                    onChange={(e) => handleInputChange(e)}
                    onBlur={(e) => handleInputChange(e)}
                    required
                />
                <label htmlFor="contact">Contact:</label>
                {errors.contact && <p className="invalid">{errors.contact}</p>}
                <PhoneNumberInput
                    phoneValue={userData.contact}
                    handleFormChange={handleInputChange}
                />
                <label htmlFor="address">Address:</label>
                {errors.address && <p className="invalid">{errors.address}</p>}
                <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address"
                    value={userData.address}
                    onChange={(e) => handleInputChange(e)}
                    onBlur={(e) => handleInputChange(e)}
                    required
                />
                <button type="submit">
                    {isSubmitting ? 'Editing' : 'Edit'}
                </button>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                limit={1}
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
        </div>
    )
}

export default EditUser
