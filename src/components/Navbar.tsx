'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

interface NavbarProps {
    isHome?: boolean;
    isDashboard?: boolean;
}

export default function Navbar({ isHome = false, isDashboard = false }: NavbarProps) {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (id: string) => {
        if (!isHomePage) {
            window.location.href = `/#${id}`;
            return;
        }

        // Close the mobile menu first
        setIsMenuOpen(false);

        // Wait for the menu close animation to complete
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                const navbarHeight = 64; // height of the navbar (h-16 = 64px)
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100); // Small delay to ensure menu is closed
    };

    return (
        <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link
                            href="/"
                            className="flex items-center px-2 text-xl font-bold text-indigo-600"
                        >
                            InterviewPrep
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center">
                        {isHome && (
                            <div className="flex space-x-8">
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    onClick={() => scrollToSection('questions')}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                                >
                                    Questions
                                </motion.button>

                                <motion.button
                                    whileHover={{ y: -2 }}
                                    onClick={() => scrollToSection('companies')}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                                >
                                    Companies
                                </motion.button>

                                <motion.button
                                    whileHover={{ y: -2 }}
                                    onClick={() => scrollToSection('categories')}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                                >
                                    Categories
                                </motion.button>
                            </div>
                        )}

                        {isDashboard && (
                            <div className="flex space-x-8">
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    onClick={() => window.location.href = '/questions'}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                                >
                                    Questions
                                </motion.button>

                                <motion.button
                                    whileHover={{ y: -2 }}
                                    onClick={() => window.location.href = '/companies'}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                                >
                                    Companies
                                </motion.button>

                                <motion.button
                                    whileHover={{ y: -2 }}
                                    onClick={() => window.location.href = '/categories'}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                                >
                                    Categories
                                </motion.button>
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    onClick={() => window.location.href = '/contribute'}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                                >
                                    Contribute
                                </motion.button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    {(isHome || isDashboard) && (
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            >
                                {isMenuOpen ? (
                                    <FiX className="block h-6 w-6" />
                                ) : (
                                    <FiMenu className="block h-6 w-6" />
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isHome && isMenuOpen && (
                    <motion.div
                        className="md:hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                            <motion.button
                                onClick={() => scrollToSection('questions')}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                whileTap={{ scale: 0.95 }}
                            >
                                Questions
                            </motion.button>
                            <motion.button
                                onClick={() => scrollToSection('companies')}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                whileTap={{ scale: 0.95 }}
                            >
                                Companies
                            </motion.button>
                            <motion.button
                                onClick={() => scrollToSection('categories')}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                whileTap={{ scale: 0.95 }}
                            >
                                Categories
                            </motion.button>
                        </div>
                    </motion.div>
                )}
                {isDashboard && isMenuOpen && (
                    <motion.div
                        className="md:hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                            <motion.button
                                whileHover={{ y: -2 }}
                                onClick={() => window.location.href = '/questions'}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            >
                                Questions
                            </motion.button>

                            <motion.button
                                whileHover={{ y: -2 }}
                                onClick={() => window.location.href = '/companies'}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            >
                                Companies
                            </motion.button>

                            <motion.button
                                whileHover={{ y: -2 }}
                                onClick={() => window.location.href = '/categories'}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            >
                                Categories
                            </motion.button>
                            <motion.button
                                onClick={() => window.location.href = '/contribute'}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                whileHover={{ y: -2 }}
                            >
                                Contribute
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
} 