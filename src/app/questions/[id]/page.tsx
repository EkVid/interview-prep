'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiTag, FiClock, FiBarChart2, FiStar, FiShare2, FiBookmark } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbar from '@/components/Navbar';

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

// This would normally come from an API/database
const getQuestionData = (id: string): Question | null => {
    const questions: Record<string, Question> = {
        '1': {
            id: '1',
            title: 'Two Sum',
            description: 'Given an array of integers nums and an integer target, return indices of the two numbers in the array that add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
            difficulty: 'Easy',
            tags: ['Array', 'Hash Table', 'Programming'],
            solution: `function twoSum(nums: number[], target: number): number[] {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    
    return [];
}`,
            explanation: `This solution uses a hash map to achieve O(n) time complexity:

1. We iterate through the array once, for each number:
   - Calculate its complement (target - current number)
   - Check if the complement exists in our map
   - If found, we've found our pair
   - If not, add current number to map

2. Space complexity is O(n) to store the hash map
3. Time complexity is O(n) as we only need one pass

Example:
nums = [2, 7, 11, 15], target = 9

1. i = 0: num = 2
   - complement = 9 - 2 = 7
   - map is empty, add 2 -> 0
2. i = 1: num = 7
   - complement = 9 - 7 = 2
   - 2 exists in map! Return [0, 1]`,
            testCases: [
                {
                    input: 'nums = [2,7,11,15], target = 9',
                    output: '[0,1]',
                    explanation: 'nums[0] + nums[1] = 2 + 7 = 9'
                },
                {
                    input: 'nums = [3,2,4], target = 6',
                    output: '[1,2]',
                    explanation: 'nums[1] + nums[2] = 2 + 4 = 6'
                }
            ],
            isProgramming: true,
            programmingLanguage: 'typescript',
            company: 'Google',
            estimatedTime: '15-20 min',
            relatedTopics: ['Hash Table', 'Array', 'Two Pointers'],
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)'
        },
        '2': {
            id: '2',
            title: 'System Design: URL Shortener',
            description: 'Design a URL shortening service like bit.ly. The service should take a long URL and return a shortened version, and when users access the short URL, they should be redirected to the original URL.',
            difficulty: 'Medium' as const,
            tags: ['System Design', 'Distributed Systems', 'Database'],
            solution: `Key Components:
1. API Gateway
   - Handle incoming requests for URL shortening and redirection

2. URL Shortening Service
   - Generate unique short URLs using base62 encoding
   - Store mapping in database
   - Handle collisions

3. Database
   - Primary: NoSQL (e.g., DynamoDB)
   - Cache: Redis for fast lookups

4. Load Balancer
   - Distribute traffic across multiple servers`,
            explanation: `Detailed System Design Approach:

1. Requirements Analysis:
   - Functional Requirements:
     * Shorten long URLs
     * Redirect to original URL
     * Custom short URLs (optional)
     * Analytics (optional)
   
   - Non-Functional Requirements:
     * Highly available
     * Minimal latency
     * URL shouldn't be guessable
     * Scalable

2. Capacity Estimation:
   - Read-heavy system (100:1 read/write ratio)
   - 100M URLs/month = ~40 URLs/second
   - Storage: ~500 bytes per URL pair = ~500GB/month
   
3. System API:
   \`\`\`typescript
   createShortUrl(api_dev_key: string, original_url: string, custom_alias?: string): string
   getOriginalUrl(short_url: string): string
   \`\`\`

4. Database Design:
   \`\`\`sql
   URLs {
     id: bigint,
     short_key: varchar(8),
     original_url: varchar(512),
     user_id: bigint,
     created_at: timestamp,
     expires_at: timestamp
   }
   \`\`\`

5. Detailed Component Design:
   a) URL Encoding:
      - Base62 encoding ([a-zA-Z0-9])
      - 6 characters = 62^6 ≈ 57B possibilities
   
   b) Cache:
      - Redis with LRU eviction
      - Cache frequently accessed URLs
   
   c) Load Balancer:
      - Round-robin for API servers
      - Consistent hashing for cache servers

6. Scale Considerations:
   - Database sharding by URL hash
   - CDN for popular URLs
   - Rate limiting
   - Analytics service (optional)`,
            testCases: [
                {
                    input: 'original_url = "https://www.example.com/very/long/path"',
                    output: 'short_url = "http://short.url/aB3x9Y"',
                    explanation: 'Converts long URL to short 6-character key'
                }
            ],
            isProgramming: false,
            company: 'Microsoft',
            estimatedTime: '45-60 min',
            relatedTopics: ['Distributed Systems', 'Caching', 'Load Balancing'],
            timeComplexity: 'O(1) for lookups',
            spaceComplexity: 'O(n) where n is number of URLs'
        }
    };

    return questions[id] || null;
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