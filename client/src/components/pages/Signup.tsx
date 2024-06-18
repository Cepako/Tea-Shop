import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './Login.scss'
import PasswordInput from './login-components/PasswordInput'
import PhoneNumberInput from './login-components/PhoneNumberInput'

const Signup: React.FC = () => {
    const navigate = useNavigate()
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        confPassword: '',
        contact: '',
        address: '',
    })
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confPassword: '',
        contact: '',
        address: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const notifySuccess = () =>
        toast.success('User Created!', {
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

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSignupData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        const newErrors: any = {}
        if (signupData.name.trim().length < 3) {
            newErrors.name = 'The name must be at least 3 characters long!'
        }
        if (!signupData.email.includes('.')) {
            newErrors.email = 'Please enter a valid e-mail address!'
        }
        if (signupData.password.trim().length < 5) {
            newErrors.password = 'Password must contain min 5 characters!'
        }
        if (signupData.password.trim() !== signupData.confPassword.trim()) {
            newErrors.confPassword = 'Password must be the same!'
        }
        if (signupData.contact.replace(/[^0-9]/g, '').slice(2).length < 9) {
            newErrors.phoneNumber = 'Please enter a valid phone number!'
        }
        if (signupData.address.length < 5) {
            newErrors.address = 'Please enter a valid address!'
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setIsSubmitting(false)
            return
        }
        try {
            const fd = new FormData(e.target as HTMLFormElement)
            const response = await fetch('http://localhost:8080/auth/signup', {
                method: 'PUT',
                body: fd,
            })
            if (!response.ok) {
                const errorData = await response.json()
                notifyError(errorData.data[0].msg)
                throw new Error(errorData.data[0].msg)
            }
            notifySuccess()
            setTimeout(() => navigate('/login'), 1000)
        } catch (error) {
            console.error('Failed to Sign up. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        if (signupData.name.trim().length >= 3) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: '',
            }))
        }
        if (signupData.email.includes('.')) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: '',
            }))
        }
        if (signupData.password.trim().length >= 5) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: '',
            }))
        }
        if (signupData.password.trim() === signupData.confPassword.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confPassword: '',
            }))
        }
        if (signupData.contact.replace(/[^0-9]/g, '').slice(2).length === 9) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                phoneNumber: '',
            }))
        }
        if (signupData.address.length >= 5) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                address: '',
            }))
        }
    }, [signupData])
    return (
        <div className="login-page">
            <div className="login-page__box">
                <img
                    className="logo"
                    src="./images/shop-logo.svg"
                    alt="cup of tea"
                />
                <h2>Sign up to Bloom's Tea</h2>
                <p>Create your account</p>
                <form onSubmit={handleSubmit}>
                    {errors.name && <p className="invalid">{errors.name}</p>}
                    <input
                        type="text"
                        name="name"
                        placeholder="Username"
                        onChange={(e) => handleFormChange(e)}
                        onBlur={(e) => handleFormChange(e)}
                        required
                    />
                    {errors.email && <p className="invalid">{errors.email}</p>}
                    <input
                        type="email"
                        name="email"
                        value={signupData.email}
                        placeholder="Email"
                        required
                        onChange={(e) => handleFormChange(e)}
                        onBlur={(e) => handleFormChange(e)}
                    />
                    {errors.password && (
                        <p className="invalid">{errors.password}</p>
                    )}
                    <PasswordInput
                        passValue={signupData.password}
                        handleFormChange={handleFormChange}
                        placeholder="Password"
                        name="password"
                    />
                    {errors.confPassword && (
                        <p className="invalid">{errors.confPassword}</p>
                    )}
                    <PasswordInput
                        passValue={signupData.confPassword}
                        handleFormChange={handleFormChange}
                        placeholder="Confirm Password"
                        name="confPassword"
                    />
                    {errors.contact && (
                        <p className="invalid">{errors.contact}</p>
                    )}
                    <PhoneNumberInput
                        phoneValue={signupData.contact}
                        handleFormChange={handleFormChange}
                    />
                    {errors.address && (
                        <p className="invalid">{errors.address}</p>
                    )}
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={signupData.address}
                        onChange={(e) => handleFormChange(e)}
                        onBlur={(e) => handleFormChange(e)}
                        required
                    />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Signing up' : 'Sign up'}
                    </button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
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

export default Signup
