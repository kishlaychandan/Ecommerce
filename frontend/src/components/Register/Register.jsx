import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: ''
    });
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');  // For detailed error messages

    const handleChange = (e) => {
        const { value, name } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/user/register', { ...user });
            console.log(response);
            setUser({ firstName: '', lastName: '', email: '', password: '', role: '' });

            if (response.status === 201 || response.data.message === 'User created successfully') {
                setRegistrationStatus(true);
                setErrorMessage('');  // Clear error messages on success
            } else {
                setRegistrationStatus(false);
                setErrorMessage('Failed to register: Please check your inputs.');
            }
        } catch (error) {
            setRegistrationStatus(false);
            setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                {/* Display registration status messages */}
                <div className="mb-6">
                    {registrationStatus === null ? (
                        <p className="text-lg text-gray-700 text-center">Please fill in the form to register.</p>
                    ) : registrationStatus ? (
                        <p className="text-lg text-green-600 text-center">Registration Successful!</p>
                    ) : (
                        <p className="text-lg text-red-600 text-center">{errorMessage}</p>
                    )}
                </div>

                <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={user.firstName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={user.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="role"
                        placeholder="User"
                        value="user"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-4 text-sm text-gray-600 text-center">
                    Already have an account?{' '}
                    <a href="/user/login" className="text-blue-500 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;
