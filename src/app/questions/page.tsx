'use client';

import Question from '@/components/Question';
import Navbar from '@/components/Navbar';

export default function QuestionsPage() {
    const exampleQuestions = [
        {
            id: '1',
            title: 'Two Sum',
            description: 'Given an array of integers nums and an integer target, return indices of the two numbers in the array that add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
            difficulty: 'Easy' as const,
            position: 'Software Engineer',
            type: 'New Grad',
            time: 'Sep 2024',
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
            isProgramming: true,
            programmingLanguage: 'typescript',
            company: 'Google',
            estimatedTime: '15-20 min'
        },
        {
            id: '2',
            title: 'System Design: URL Shortener',
            description: 'Design a URL shortening service like bit.ly. The service should take a long URL and return a shortened version, and when users access the short URL, they should be redirected to the original URL.',
            difficulty: 'Medium' as const,
            position: 'Software Engineer Intern',
            type: 'Intern',
            time: 'Summer 2024',
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
   - Distribute traffic across multiple servers

Capacity Estimation:
- Read-heavy system (100:1 read/write ratio)
- 100M URLs/month = ~40 URLs/second
- Storage: ~500 bytes per URL pair = ~500GB/month

Scale Considerations:
- Horizontal scaling for API servers
- Database sharding by URL hash
- CDN for popular URLs
- Rate limiting to prevent abuse`,
            isProgramming: false,
            company: 'Microsoft',
            estimatedTime: '45-60 min'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Interview Questions</h1>
                        <p className="mt-2 text-gray-600">Practice with real interview questions from top companies.</p>
                    </div>

                    <div className="space-y-6">
                        {exampleQuestions.map((question) => (
                            <Question key={question.id} {...question} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
} 