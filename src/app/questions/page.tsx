'use client';

import Question from '@/components/Question';
import Navbar from '@/components/Navbar';
import questionsData from '@/data/questions.json';

// Convert the difficulty string to the correct type
const convertQuestion = (question: any) => ({
    ...question,
    difficulty: question.difficulty as 'Easy' | 'Medium' | 'Hard'
});

export default function QuestionsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
            <Navbar isDashboard={true}/>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Interview Questions</h1>
                        <p className="mt-2 text-gray-600">Practice with real interview questions from top companies.</p>
                    </div>

                    <div className="space-y-6">
                        {questionsData.questions.map((question) => (
                            <Question key={question.id} {...convertQuestion(question)} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
} 