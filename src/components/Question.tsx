'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiCode, FiTag, FiStar, FiClock, FiBarChart2 } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface QuestionProps {
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    tags: string[];
    solution: string;
    isProgramming?: boolean;
    programmingLanguage?: string;
    estimatedTime?: string;
    company?: string;
    position?: string;
    time?: string;
    type?: string;
}

export default function Question({
    id,
    title,
    description,
    difficulty,
    tags,
    solution,
    isProgramming = false,
    programmingLanguage = 'javascript',
    estimatedTime = '20-30 min',
    company,
    position,
    time,
    type
}: QuestionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showSolution, setShowSolution] = useState(false);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'easy':
                return 'bg-green-100 text-green-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'hard':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <motion.div
            layout
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="p-6">
                <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => window.location.href = `/questions/${id}`}
                >
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(difficulty)}`}>
                                {difficulty}
                            </span>
                            {company && (
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                    {company}
                                </span>
                            )}
                            {type && (
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    {type}
                                </span>
                            )}
                            {position && time && (
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    {position} • {time}
                                </span>
                            )}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                                <FiClock className="w-4 h-4" />
                                {estimatedTime}
                            </div>
                            <div className="flex items-center gap-1">
                                <FiBarChart2 className="w-4 h-4" />
                                {difficulty}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm"
                                >
                                    <FiTag className="w-3 h-3" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-indigo-600 hover:text-indigo-500"
                        onClick={(e) => {
                            e.stopPropagation();  // Prevent navigation when clicking star
                            // Add favorite functionality here
                        }}
                    >
                        <FiStar className="w-6 h-6" />
                    </motion.button>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4"
                            onClick={(e) => e.stopPropagation()} // Prevent navigation when interacting with expanded content
                        >
                            <div className="prose max-w-none">
                                <p className="text-gray-600">{description}</p>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={() => setShowSolution(!showSolution)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                                >
                                    <FiCode className="w-4 h-4" />
                                    {showSolution ? 'Hide Solution' : 'Show Solution'}
                                </button>

                                <AnimatePresence>
                                    {showSolution && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mt-4"
                                        >
                                            {isProgramming ? (
                                                <div className="relative">
                                                    <SyntaxHighlighter
                                                        language={programmingLanguage}
                                                        style={atomDark}
                                                        className="rounded-xl !bg-gray-900"
                                                        showLineNumbers
                                                    >
                                                        {solution}
                                                    </SyntaxHighlighter>
                                                    <div className="absolute top-2 right-2">
                                                        <button
                                                            onClick={() => navigator.clipboard.writeText(solution)}
                                                            className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 text-sm hover:bg-gray-700 transition-colors"
                                                        >
                                                            Copy
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="prose max-w-none">
                                                    <p className="text-gray-600">{solution}</p>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center justify-center w-full gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                    {isExpanded ? (
                        <>
                            Show Less
                            <FiChevronUp className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            Show More
                            <FiChevronDown className="w-4 h-4" />
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
} 