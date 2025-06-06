'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiCode } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { loginUser } from '@/utils/api';

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const res = await loginUser(email, password);

            if(res.success){
                // If login is successful, set authentication cookie and redirect
                document.cookie = 'isAuthenticated=true; path=/; max-age=86400'; // 24 hours
                router.push('/dashboard');
                return;
            } else {
                setError(res.message || 'Login failed. Please try again.');
            }
        } catch(error){
            setError('An error occurred while logging in. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
            <Navbar isLogin={true} />

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
                                Welcome back
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Sign in to access interview questions and resources
                            </p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-5 rounded-md">
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
                                <div className="relative">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            className="pl-10 block w-full rounded-xl border-gray-900 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-900"
                                            placeholder="Enter shared password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
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
                                    Sign in
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
                            Don't have an account?{' '}
                            <Link
                                href="/create-account"
                                className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
} 