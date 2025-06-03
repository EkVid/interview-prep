'use client';

import Navbar from '@/components/Navbar';
import StatCard from '@/components/StatCard';
import { FiBookOpen, FiBriefcase, FiUsers, FiAward, FiTrendingUp, FiStar, FiLock } from 'react-icons/fi';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar isHome={true} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Hero Section */}
        <motion.div
          className="text-center py-6 sm:py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            Prepare for Your Next
            <span className="text-indigo-600"> Interview</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Access thousands of real interview questions from top companies. Practice, learn, and land your dream job.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-6 sm:mt-10 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeInUp}>
            <StatCard
              title="Total Questions"
              value="5,000+"
              description="From various companies"
              icon={<FiBookOpen className="w-6 h-6" />}
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <StatCard
              title="Companies"
              value="100+"
              description="Top tech companies"
              icon={<FiBriefcase className="w-6 h-6" />}
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <StatCard
              title="Active Users"
              value="10,000+"
              description="Learning together"
              icon={<FiUsers className="w-6 h-6" />}
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <StatCard
              title="Success Stories"
              value="1,000+"
              description="Jobs secured"
              icon={<FiAward className="w-6 h-6" />}
            />
          </motion.div>
        </motion.div>

        {/* Questions Section */}
        <motion.div
          id="questions"
          className="mt-8 sm:mt-16 pt-16 -mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center mb-6">
            <FiTrendingUp className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Popular Questions</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trendingQuestions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                    {question.difficulty}
                  </span>
                  <span className="text-sm text-gray-500">{question.company}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{question.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{question.description}</p>
                <div className="flex items-center text-indigo-600 text-sm">
                  <FiStar className="w-4 h-4 mr-1" />
                  <span>{question.popularity}k views</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Companies Section */}
        <motion.div
          id="companies"
          className="mt-8 sm:mt-16 pt-16 -mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <FiBriefcase className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Top Companies</h2>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {topCompanies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center hover:shadow-md transition-all"
              >
                <span className="text-4xl mb-2">{company.logo}</span>
                <h3 className="text-sm font-medium text-gray-900">{company.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{company.questionCount}+ questions</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Categories Section */}
        <motion.div
          id="categories"
          className="mt-8 sm:mt-16 pt-16 -mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center mb-6">
            <FiBookOpen className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Popular Categories</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={category.href}
                  className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow block"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                    <p className="mt-2 text-sm text-gray-500">{category.description}</p>
                    <div className="mt-4 flex items-center text-indigo-600">
                      <span className="text-sm font-medium">Learn more</span>
                      <svg
                        className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer with Auth Section */}
      <motion.footer
        id="auth-required"
        className="bg-white border-t border-gray-200 mt-8 sm:mt-16 pt-16 -mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-3 sm:mb-4">
                <FiLock className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 mr-2 sm:mr-3" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Ready to Contribute?</h2>
              </div>
              <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto md:mx-0">
                Join our community to share your interview experiences and help others prepare for their dream jobs.
                Your contributions make a difference!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-3 sm:gap-4">
              <Link href="/sign-in">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-40 sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm rounded-full sm:rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm hover:shadow"
                >
                  Sign In
                </motion.button>
              </Link>
              <Link href="/create-account">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-40 sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm rounded-full sm:rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  Create Account
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

const categories = [
  {
    name: 'Data Structures & Algorithms',
    description: 'Master fundamental DSA concepts with practice problems',
    href: '/questions/dsa',
  },
  {
    name: 'System Design',
    description: 'Learn how to design scalable systems and architectures',
    href: '/questions/system-design',
  },
  {
    name: 'Behavioral Questions',
    description: 'Prepare for common behavioral and situational questions',
    href: '/questions/behavioral',
  },
];

const trendingQuestions = [
  {
    id: '1',
    title: 'Design a Rate Limiter',
    company: 'Netflix',
    difficulty: 'Hard',
    description: 'Design a rate limiter that can handle millions of requests per second.',
    popularity: 15,
  },
  {
    id: '2',
    title: 'LRU Cache Implementation',
    company: 'Google',
    difficulty: 'Medium',
    description: 'Implement a data structure for Least Recently Used (LRU) cache.',
    popularity: 12,
  },
  {
    id: '3',
    title: 'Leadership Experience',
    company: 'Amazon',
    difficulty: 'Medium',
    description: 'Tell me about a time you demonstrated leadership skills.',
    popularity: 10,
  },
];

const topCompanies = [
  { name: 'Google', logo: '🔍', questionCount: 150 },
  { name: 'Meta', logo: '👤', questionCount: 130 },
  { name: 'Amazon', logo: '📦', questionCount: 200 },
  { name: 'Microsoft', logo: '⊞', questionCount: 120 },
  { name: 'Apple', logo: '🍎', questionCount: 90 },
  { name: 'Netflix', logo: '🎬', questionCount: 75 },
];
