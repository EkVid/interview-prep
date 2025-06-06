'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiCode } from 'react-icons/fi';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { registerUser } from '@/utils/api';
import { useRouter } from 'next/navigation';

export default function CreateAccountPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const res = await registerUser(username, email);

            if(res.success){
                router.push('/sign-in');
                return;
            } else {
                setError(res.message || 'Registration failed. Please try again.');
            }
        } catch (error){
            setError('An error occurred while creating your account. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
            <Navbar isSignUp={true} />

            <div className="flex min-h-screen -mt-16 items-center justify-center px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                        <div className="flex flex-col items-center">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <FiCode className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                                Join the community
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Create an account to start contributing
                            </p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-5 rounded-md">
                                <div className="relative">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            required
                                            className="pl-10 block w-full rounded-xl border-gray-900 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-900"
                                            placeholder="Choose your username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="pl-10 block w-full rounded-xl border-gray-900 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-900"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm text-center bg-red-50 py-2 px-4 rounded-lg"
                                >
                                    {error}
                                </motion.p>
                            )}

                            <div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="group relative flex w-full justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 shadow-lg shadow-indigo-100"
                                >
                                    Create Account
                                </motion.button>
                            </div>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-4 text-gray-500">or</span>
                            </div>
                        </div>

                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href="/sign-in"
                                className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
} 