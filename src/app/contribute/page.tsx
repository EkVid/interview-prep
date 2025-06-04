'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiSave, FiAward, FiBookmark, FiBriefcase, FiUsers, FiClock, FiTag, FiCalendar, FiChevronDown, FiFileText } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface DifficultyOption {
    value: 'Easy' | 'Medium' | 'Hard';
    color: string;
    bgColor: string;
    hoverBg: string;
}

interface DropdownOption {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

interface CustomDropdownProps {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
    label: string;
    placeholder?: string;
}

function CustomDropdown({ options, value, onChange, label, placeholder }: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
                <span className="flex items-center text-gray-900">
                    {selectedOption ? (
                        <>
                            {selectedOption.icon && <span className="mr-2">{selectedOption.icon}</span>}
                            {selectedOption.label}
                        </>
                    ) : (
                        <span className="text-gray-400">{placeholder || 'Select option'}</span>
                    )}
                </span>
                <FiChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-1 max-h-60 overflow-auto"
                    >
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-2 text-left flex items-center hover:bg-gray-50 ${value === option.value ? 'bg-indigo-50 text-indigo-600' : 'text-gray-900'
                                    }`}
                            >
                                {option.icon && <span className="mr-2">{option.icon}</span>}
                                {option.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function InputWithIcon({ label, icon, ...props }: { label: string; icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative rounded-lg shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {icon}
                </div>
                <input
                    {...props}
                    className="w-full bg-white pl-10 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                />
            </div>
        </div>
    );
}

function TextAreaWithIcon({ label, icon, ...props }: { label: string; icon: React.ReactNode } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative rounded-lg shadow-sm">
                <div className="pointer-events-none absolute top-3 left-0 flex items-start pl-3">
                    {icon}
                </div>
                <textarea
                    {...props}
                    className="w-full bg-white pl-10 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                />
            </div>
        </div>
    );
}

export default function ContributePage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
        tags: '',
        solution: '',
        type: '',
        programmingLanguage: 'typescript',
        company: '',
        estimatedTime: '',
        position: '',
        time: '',
        explanation: '',
        timeComplexity: '',
        spaceComplexity: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            tags: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Convert tags string to array
        const questionData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            id: (new Date()).getTime().toString() // Temporary ID generation
        };

        console.log('Question Data:', questionData);
        // TODO: Add to questions.json (will be handled by backend later)
    };

    const difficultyOptions: DifficultyOption[] = [
        { value: 'Easy', color: 'text-green-700', bgColor: 'bg-green-50', hoverBg: 'hover:bg-green-100' },
        { value: 'Medium', color: 'text-yellow-700', bgColor: 'bg-yellow-50', hoverBg: 'hover:bg-yellow-100' },
        { value: 'Hard', color: 'text-red-700', bgColor: 'bg-red-50', hoverBg: 'hover:bg-red-100' },
    ];

    const typeOptions: DropdownOption[] = [
        { value: '', label: 'Select Type', icon: <FiCode className="w-4 h-4" /> },
        { value: 'Coding', label: 'Coding', icon: <FiCode className="w-4 h-4 text-blue-500" /> },
        { value: 'Conceptual', label: 'Tech Conceptual', icon: <FiCode className="w-4 h-4 text-yellow-500" /> },
        { value: 'System Design', label: 'System Design', icon: <FiCode className="w-4 h-4 text-green-500" /> },
        { value: 'Behavioral', label: 'Behavioral', icon: <FiUsers className="w-4 h-4 text-purple-500" /> }
    ];

    const languageOptions: DropdownOption[] = [
        { value: 'typescript', label: 'TypeScript', icon: <FiCode className="w-4 h-4 text-blue-500" /> },
        { value: 'javascript', label: 'JavaScript', icon: <FiCode className="w-4 h-4 text-yellow-500" /> },
        { value: 'python', label: 'Python', icon: <FiCode className="w-4 h-4 text-green-500" /> },
        { value: 'java', label: 'Java', icon: <FiCode className="w-4 h-4 text-red-500" /> },
        { value: 'cpp', label: 'C++', icon: <FiCode className="w-4 h-4 text-purple-500" /> }
    ];

    const isCoding = formData.type === 'Coding';
    const isConceptual = formData.type === 'Conceptual';
    const isSystemDesign = formData.type === 'System Design';
    const isBehavioral = formData.type === 'Behavioral';

    // Function to parse and render text with code snippets
    const renderWithCodeSnippets = (text: string) => {
        if (!text) return null;

        const parts = text.split(/(<code>[\s\S]*?<\/code>)/g);
        return parts.map((part, index) => {
            if (part.startsWith('<code>') && part.endsWith('</code>')) {
                const code = part.slice(6, -7); // Remove <code> and </code> tags
                return (
                    <SyntaxHighlighter
                        key={index}
                        language={formData.programmingLanguage}
                        style={atomDark}
                        className="inline-block rounded mx-1 text-sm"
                        customStyle={{ padding: '2px 6px', display: 'inline' }}
                    >
                        {code}
                    </SyntaxHighlighter>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
            <Navbar isDashboard={true} />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-indigo-100 p-2 rounded-lg">
                                <FiCode className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Contribute a Question</h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputWithIcon
                                    label="Title"
                                    icon={<FiBookmark className="h-5 w-5 text-gray-400" />}
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                                    <div className="flex gap-2">
                                        {difficultyOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, difficulty: option.value }))}
                                                className={`
                                                    flex items-center px-4 py-2 rounded-lg border transition-all duration-200
                                                    ${formData.difficulty === option.value
                                                        ? `${option.bgColor} ${option.color} border-${option.color.split('-')[1]}-200 shadow-sm`
                                                        : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                                                    }
                                                `}
                                            >
                                                <FiAward
                                                    className={`mr-2 h-4 w-4 ${formData.difficulty === option.value
                                                        ? option.color
                                                        : 'text-gray-400'
                                                        }`}
                                                />
                                                {option.value}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Company and Position Information */}
                            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                                <h3 className="text-lg font-medium text-gray-900">Company Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <InputWithIcon
                                        label="Company"
                                        icon={<FiBriefcase className="h-5 w-5 text-gray-400" />}
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                    />
                                    <InputWithIcon
                                        label="Position"
                                        icon={<FiUsers className="h-5 w-5 text-gray-400" />}
                                        type="text"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleInputChange}
                                    />
                                    <CustomDropdown
                                        label="Type"
                                        options={typeOptions}
                                        value={formData.type}
                                        onChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                                        placeholder="Select Type"
                                    />
                                </div>

                                {/* Additional Information */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <InputWithIcon
                                        label="Time Period"
                                        icon={<FiCalendar className="h-5 w-5 text-gray-400" />}
                                        type="text"
                                        name="time"
                                        placeholder="e.g., Summer 2024"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                    />
                                    <InputWithIcon
                                        label="Estimated Time"
                                        icon={<FiClock className="h-5 w-5 text-gray-400" />}
                                        type="text"
                                        name="estimatedTime"
                                        placeholder="e.g., 20-30 min"
                                        value={formData.estimatedTime}
                                        onChange={handleInputChange}
                                    />
                                    <InputWithIcon
                                        label="Tags"
                                        icon={<FiTag className="h-5 w-5 text-gray-400" />}
                                        type="text"
                                        placeholder="Separate by commas"
                                        value={formData.tags}
                                        onChange={handleTagsChange}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <TextAreaWithIcon
                                label="Description"
                                icon={<FiCode className="h-5 w-5 text-gray-400" />}
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                required
                            />

                            {/* Solution Type and Language */}
                            {isCoding && (
                                <div className="space-y-4">
                                    <CustomDropdown
                                        label="Programming Language"
                                        options={languageOptions}
                                        value={formData.programmingLanguage}
                                        onChange={(value) => setFormData(prev => ({ ...prev, programmingLanguage: value }))}
                                    />
                                </div>
                            )}

                            {/* Solution */}
                            <div className="space-y-4">
                                {isConceptual && (
                                    <div className="mb-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <CustomDropdown
                                                    label="Code Language"
                                                    options={languageOptions}
                                                    value={formData.programmingLanguage}
                                                    onChange={(value) => setFormData(prev => ({ ...prev, programmingLanguage: value }))}
                                                />
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Use <code className="bg-gray-100 px-1 py-0.5 rounded">&lt;code&gt;your code here&lt;/code&gt;</code> for inline code
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <TextAreaWithIcon
                                    label={isBehavioral ? "Answer" : "Solution"}
                                    icon={<FiCode className="h-5 w-5 text-gray-400" />}
                                    name="solution"
                                    value={formData.solution}
                                    onChange={handleInputChange}
                                    rows={8}
                                    required
                                    className={isCoding ? "font-mono" : ""}
                                    placeholder={
                                        isBehavioral
                                            ? "Write your behavioral answer here..."
                                            : isConceptual
                                                ? "Explain the concept with examples. Use <code>your code</code> for inline code snippets..."
                                                : "Write your solution here..."
                                    }
                                />

                                {/* Live Preview for Conceptual */}
                                {isConceptual && formData.solution && (
                                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                                        <div className="prose max-w-none text-gray-900">
                                            {renderWithCodeSnippets(formData.solution)}
                                        </div>
                                    </div>
                                )}

                                {/* Solution Preview for Coding */}
                                {isCoding && formData.solution && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Solution Preview</label>
                                        <SyntaxHighlighter
                                            language={formData.programmingLanguage}
                                            style={atomDark}
                                            className="rounded-lg"
                                        >
                                            {formData.solution}
                                        </SyntaxHighlighter>
                                    </div>
                                )}
                            </div>

                            {/* Complexity */}
                            {isCoding && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputWithIcon
                                        label="Time Complexity"
                                        icon={<FiClock className="h-5 w-5 text-gray-400" />}
                                        type="text"
                                        name="timeComplexity"
                                        placeholder="e.g., O(n)"
                                        value={formData.timeComplexity}
                                        onChange={handleInputChange}
                                    />
                                    <InputWithIcon
                                        label="Space Complexity"
                                        icon={<FiClock className="h-5 w-5 text-gray-400" />}
                                        type="text"
                                        name="spaceComplexity"
                                        placeholder="e.g., O(n)"
                                        value={formData.spaceComplexity}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )}

                            {/* Explanation */}
                            <TextAreaWithIcon
                                label="Detailed Explanation (Optional)"
                                required={false}
                                icon={<FiFileText className="h-5 w-5 text-gray-400" />}
                                name="explanation"
                                value={formData.explanation}
                                onChange={handleInputChange}
                                rows={4}
                                placeholder={
                                    isBehavioral
                                        ? "Explain why this is a good behavioral answer..."
                                        : isSystemDesign
                                            ? "Explain your system design approach..."
                                            : "Explain your solution approach..."
                                }
                            />

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <FiSave className="mr-2" />
                                    Save Question
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </main>
        </div>
    );
} 