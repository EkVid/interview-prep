'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FiSend, FiGift } from 'react-icons/fi';

interface FormData {
    title: string;
    company: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: string;
    description: string;
    solution: string;
}

const formFields = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 }
};

export default function ContributePage() {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        company: '',
        difficulty: 'Medium',
        category: '',
        description: '',
        solution: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);

        // Reset form
        setFormData({
            title: '',
            company: '',
            difficulty: 'Medium',
            category: '',
            description: '',
            solution: '',
        });
        setIsSubmitting(false);

        // Show success message
        alert('Thank you for contributing! Your question will be reviewed by our team.');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-3xl mx-auto py-30 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-3"
                    >
                        <FiGift className="w-6 h-6 text-indigo-600" />
                        <h1 className="text-2xl font-semibold text-gray-900">Contribute a Question</h1>
                    </motion.div>

                    <motion.p
                        className="mt-2 text-sm text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Help others prepare by sharing your interview questions and experiences.
                    </motion.p>

                    <motion.form
                        onSubmit={handleSubmit}
                        className="mt-6 space-y-6"
                        initial="initial"
                        animate="animate"
                    >
                        <motion.div variants={formFields}>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Question Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={formFields}>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                Company
                            </label>
                            <input
                                type="text"
                                id="company"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={formFields}>
                            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                                Difficulty
                            </label>
                            <select
                                id="difficulty"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={formData.difficulty}
                                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' })}
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </motion.div>

                        <motion.div variants={formFields}>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                id="category"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="">Select a category</option>
                                <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
                                <option value="System Design">System Design</option>
                                <option value="Behavioral">Behavioral</option>
                            </select>
                        </motion.div>

                        <motion.div variants={formFields}>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Question Description
                            </label>
                            <textarea
                                id="description"
                                required
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={formFields}>
                            <label htmlFor="solution" className="block text-sm font-medium text-gray-700">
                                Solution (Optional)
                            </label>
                            <textarea
                                id="solution"
                                rows={6}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={formData.solution}
                                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                                placeholder="Share your approach or solution..."
                            />
                        </motion.div>

                        <motion.div
                            variants={formFields}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiSend className="w-4 h-4 mr-2" />
                                {isSubmitting ? 'Submitting...' : 'Submit Question'}
                            </button>
                        </motion.div>
                    </motion.form>
                </div>
            </main>
        </div>
    );
} 