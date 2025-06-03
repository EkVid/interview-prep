'use client';

import { motion } from 'framer-motion';
import { FiBookOpen, FiBriefcase, FiGrid, FiStar, FiTrendingUp, FiUser, FiGithub, FiHeart } from 'react-icons/fi';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const DashboardCard = ({ icon: Icon, title, description, href, delay }: {
    icon: any;
    title: string;
    description: string;
    href: string;
    delay: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
    >
        <Link href={href} className="block">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="bg-indigo-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>
        </Link>
    </motion.div>
);

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
            <Navbar isDashboard={true} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-3xl font-bold text-gray-900"
                        >
                            Your Dashboard
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mt-2 text-gray-600"
                        >
                            Access all resources and start preparing for your interviews
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm"
                    >
                        <FiUser className="w-5 h-5 text-indigo-600" />
                        <span className="text-gray-900 font-medium">My Account</span>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DashboardCard
                        icon={FiBookOpen}
                        title="Practice Questions"
                        description="Access our comprehensive collection of interview questions from various companies."
                        href="/questions"
                        delay={0.2}
                    />
                    <DashboardCard
                        icon={FiBriefcase}
                        title="Browse Companies"
                        description="Explore questions and interview experiences from top tech companies."
                        href="/companies"
                        delay={0.3}
                    />
                    <DashboardCard
                        icon={FiGrid}
                        title="Categories"
                        description="Find questions organized by topic, difficulty, and type."
                        href="/categories"
                        delay={0.4}
                    />
                    <DashboardCard
                        icon={FiTrendingUp}
                        title="Trending Questions"
                        description="See what questions are currently popular among interviewees."
                        href="/questions#trending"
                        delay={0.5}
                    />
                    <DashboardCard
                        icon={FiStar}
                        title="My Favorites"
                        description="Quick access to your saved questions and study materials."
                        href="/favorites"
                        delay={0.6}
                    />
                    <DashboardCard
                        icon={FiBookOpen}
                        title="Past Questions"
                        description="View the questions you have answered and practice them again"
                        href="/past-questions"
                        delay={0.7}
                    />
                </div>
            </main>

            <motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white mt-16 border-t border-gray-100"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Contribute to InterviewPrep</h3>
                            <p className="text-gray-600 mb-6">
                                Help make interview preparation better for everyone. Share your interview experiences,
                                contribute questions, or help improve our platform.
                            </p>
                            <Link
                                href="/contribute"
                                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-500 transition-colors"
                            >
                                <FiGithub className="w-5 h-5" />
                                Start Contributing
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-8 text-sm">
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-4">Ways to Contribute</h4>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <FiHeart className="w-4 h-4 text-indigo-600" />
                                        Share Questions
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FiHeart className="w-4 h-4 text-indigo-600" />
                                        Review Solutions
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FiHeart className="w-4 h-4 text-indigo-600" />
                                        Improve Content
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-4">Community</h4>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <FiHeart className="w-4 h-4 text-indigo-600" />
                                        Discord Server
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FiHeart className="w-4 h-4 text-indigo-600" />
                                        GitHub
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FiHeart className="w-4 h-4 text-indigo-600" />
                                        Twitter
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.footer>
        </div>
    );
} 