'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiTag, FiClock, FiBarChart2, FiStar, FiShare2, FiBookmark } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbar from '@/components/Navbar';
import questionsData from '@/data/questions.json';

interface TestCase {
    input: string;
    output: string;
    explanation: string;
}

interface Question {
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    tags: string[];
    solution: string;
    explanation?: string;
    testCases?: TestCase[];
    isProgramming: boolean;
    programmingLanguage?: string;
    company: string;
    estimatedTime: string;
    relatedTopics?: string[];
    timeComplexity?: string;
    spaceComplexity?: string;
    position?: string;
    time?: string;
    type?: string;
}

// Get question data from the JSON file
const getQuestionData = (id: string): Question | null => {
    const question = questionsData.questions.find(q => q.id === id);
    if (!question) return null;

    // Type assertion to ensure the question matches our interface
    return {
        ...question,
        difficulty: question.difficulty as 'Easy' | 'Medium' | 'Hard'
    };
};

export default function QuestionDetailPage() {
    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : '';
    const question = getQuestionData(id);

    if (!question) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
                <Navbar />
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                    <h1 className="text-2xl font-bold text-gray-900">Question not found</h1>
                </main>
            </div>
        );
    }

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
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {/* Back button */}
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                        <FiArrowLeft className="w-4 h-4" />
                        Back to Questions
                    </button>

                    {/* Question header */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
                                    {question.difficulty}
                                </span>
                                {question.company && (
                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                        {question.company}
                                    </span>
                                )}
                                {question.type && (
                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        {question.type}
                                    </span>
                                )}
                                {question.position && question.time && (
                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        {question.position} • {question.time}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 text-gray-600 hover:text-gray-900"
                                >
                                    <FiBookmark className="w-5 h-5" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 text-gray-600 hover:text-gray-900"
                                >
                                    <FiShare2 className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{question.title}</h1>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                                <FiClock className="w-4 h-4" />
                                {question.estimatedTime}
                            </div>
                            {question.timeComplexity && (
                                <div className="flex items-center gap-1">
                                    <FiBarChart2 className="w-4 h-4" />
                                    Time: {question.timeComplexity}
                                </div>
                            )}
                            {question.spaceComplexity && (
                                <div className="flex items-center gap-1">
                                    <FiBarChart2 className="w-4 h-4" />
                                    Space: {question.spaceComplexity}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {question.tags.map((tag, index) => (
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

                    {/* Question content */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Problem Description</h2>
                            <div className="prose max-w-none">
                                <p className="text-gray-600">{question.description}</p>
                            </div>
                        </div>

                        {question.testCases && question.testCases.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">Example Test Cases</h2>
                                <div className="space-y-4">
                                    {question.testCases.map((testCase, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                                            <div className="text-sm text-gray-600">
                                                <p><strong>Input:</strong> {testCase.input}</p>
                                                <p><strong>Output:</strong> {testCase.output}</p>
                                                {testCase.explanation && (
                                                    <p><strong>Explanation:</strong> {testCase.explanation}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Solution</h2>
                            {question.isProgramming ? (
                                <div className="relative">
                                    <SyntaxHighlighter
                                        language={question.programmingLanguage}
                                        style={atomDark}
                                        className="rounded-xl !bg-gray-900"
                                        showLineNumbers
                                    >
                                        {question.solution}
                                    </SyntaxHighlighter>
                                    <div className="absolute top-2 right-2">
                                        <button
                                            onClick={() => navigator.clipboard.writeText(question.solution)}
                                            className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 text-sm hover:bg-gray-700 transition-colors"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="prose max-w-none">
                                    <div className="text-gray-600 whitespace-pre-wrap">{question.solution}</div>
                                </div>
                            )}
                        </div>

                        {question.explanation && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">Detailed Explanation</h2>
                                <div className="prose max-w-none">
                                    <div className="text-gray-600 whitespace-pre-wrap">{question.explanation}</div>
                                </div>
                            </div>
                        )}

                        {question.relatedTopics && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">Related Topics</h2>
                                <div className="flex flex-wrap gap-2">
                                    {question.relatedTopics.map((topic, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </main>
        </div>
    );
} 