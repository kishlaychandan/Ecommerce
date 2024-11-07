import React, { useState } from 'react';
import axios from '../axiosConfig';
import ChatBots from '../components/ChatBot/ChatBots';
import { Link } from 'react-router-dom';

function Register() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user'
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
            const response = await axios.post('/user/register', { ...user });
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
        <div 
            className="flex items-center justify-center min-h-screen" 
            style={{ 
                backgroundImage: 'url("https://images.pexels.com/photos/7862593/pexels-photo-7862593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', // Replace with your image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <ChatBots/>
            <div className="bg-purple-500 bg-opacity-20 p-8 border border-gray-300 rounded-lg shadow-md w-full max-w-md">
                {/* Display error messages */}
                {errorMessage && (
                    <div className="mb-4 p-2 text-red-600 text-center rounded-md bg-red-200">
                        {errorMessage}
                    </div>
                )}

                {/* Display registration status messages */}
                <div className="mb-6">
                    {registrationStatus === null ? (
                        <p className="text-lg text-white text-center">Please fill in the form to register.</p>
                    ) : registrationStatus ? (
                        <p className="text-lg text-white text-center">Registration Successful!</p>
                    ) : null}
                </div>

                <h1 className="text-2xl font-semibold text-center mb-6 text-yellow-500">Register</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First Name */}
                    <div>
                        <label className="block text-white mb-2" htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={user.firstName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-white mb-2" htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={user.lastName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-white mb-2" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-white mb-2" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-4 text-sm text-yellow-300 text-center">
                    Already have an account?{' '}
                    {/* <a href="/login" className="text-red-600 text-xl hover:underline ">
                        Log in
                    </a> */}
                    <Link to="/login" className="text-red-600 text-xl hover:underline "  >Log in</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
