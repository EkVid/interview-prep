'use client';

import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiTrendingUp } from 'react-icons/fi';

interface Company {
    id: string;
    name: string;
    logo: string;
    questionCount: number;
    categories: string[];
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const mockCompanies: Company[] = [
    {
        id: '1',
        name: 'Google',
        logo: '🔍',
        questionCount: 150,
        categories: ['DSA', 'System Design', 'Behavioral'],
    },
    {
        id: '2',
        name: 'Microsoft',
        logo: '⊞',
        questionCount: 120,
        categories: ['DSA', 'System Design', 'Behavioral'],
    },
    {
        id: '3',
        name: 'Amazon',
        logo: '📦',
        questionCount: 200,
        categories: ['DSA', 'System Design', 'Behavioral', 'Leadership Principles'],
    },
    {
        id: '4',
        name: 'Meta',
        logo: '👤',
        questionCount: 130,
        categories: ['DSA', 'System Design', 'Behavioral'],
    },
    {
        id: '5',
        name: 'Apple',
        logo: '🍎',
        questionCount: 90,
        categories: ['DSA', 'System Design', 'Behavioral'],
    },
];

export default function CompaniesPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCompanies = mockCompanies.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <FiTrendingUp className="w-6 h-6 text-indigo-600" />
                        <h1 className="text-2xl font-semibold text-gray-900">Top Companies</h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search companies..."
                            className="pl-10 w-full sm:max-w-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </motion.div>

                    <motion.div
                        className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        {filteredCompanies.map((company, index) => (
                            <motion.div
                                key={company.id}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-all"
                            >
                                <div className="p-6">
                                    <motion.div
                                        className="flex items-center"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 + 0.3 }}
                                    >
                                        <motion.span
                                            className="text-4xl mr-4"
                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                        >
                                            {company.logo}
                                        </motion.span>
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">{company.name}</h3>
                                            <p className="text-sm text-gray-600">{company.questionCount} questions</p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="mt-4 flex flex-wrap gap-2"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 + 0.4 }}
                                    >
                                        {company.categories.map((category) => (
                                            <motion.span
                                                key={category}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                {category}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </main>
        </div>
    );
} 