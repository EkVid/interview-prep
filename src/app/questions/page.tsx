'use client';

import Question from '@/components/Question';
import Navbar from '@/components/Navbar';
import { getAllQuestions } from '@/utils/api';
import { useEffect, useState } from 'react';

// use this for json data
// import questionsData from '@/data/questions.json';

// Convert the difficulty and tags strings to the correct type
const convertQuestion = (question: any) => ({
    ...question,
    difficulty: question.difficulty as 'Easy' | 'Medium' | 'Hard',
    tags: typeof question.tags === 'string' 
    ? question.tags.split(',').map((tag: string) => tag.trim()) 
    : question.tags || []});


export default function QuestionsPage() {
    const [questionsData, setQuestionsData] = useState<{ questions: any[] }>({ questions: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchQuestions(){
            try{
                const data = await getAllQuestions();
                setQuestionsData({questions : data});
            } catch (err){
                setError("Failed to load questions");
            } finally {
                setLoading(false);
            }
        }

        fetchQuestions();
    }, [])


    // todo: create a loading and error pages
    if (loading) return <div>Loading questions...</div>;
    if (error) return <div>{error}</div>;


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
                            <Question key={question.id ?? question.title} {...convertQuestion(question)} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
} 