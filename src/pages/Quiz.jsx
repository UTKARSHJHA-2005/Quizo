// This is the quiz page where the user answers the questions.
import React, { useEffect, useState } from "react";
import { Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react"; // Icons

const Quiz = ({ onQuizEnd }) => {
    const [questions, setQuestions] = useState([]); // Questions
    const [currentIndex, setCurrentIndex] = useState(0); // Question Number
    const [selectedAnswers, setSelectedAnswers] = useState([]); // Selected Answers:User selected answers
    const [lockedQuestions, setLockedQuestions] = useState([]); // Locked questions:User cannot visit these questions
    const [score, setScore] = useState(0); // Score
    const [timeLeft, setTimeLeft] = useState(30); // Time given for every question:30 seconds
    const API_URL = "https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX"; // API

    // Fetches the quiz questions and options from the API
    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json(); // Data in JSON format
                if (data?.questions) {
                    setQuestions(data.questions); // Questions from API
                    setSelectedAnswers(Array(data.questions.length).fill(null));
                }
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            }
        };
        fetchQuizData();
    }, []);

    // For Locking the question and moving to next question.
    useEffect(() => {
        // if time ends and no answer is selected then lock the question and move to next question. 
        if (timeLeft === 0 && !selectedAnswers[currentIndex]) {
            lockQuestionAndMoveNext();
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)); 
        }, 1000); // Decrease time every second by 1 second
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Handles the answer click event
    const handleAnswerClick = (optionObj) => {
        const newAnswers = [...selectedAnswers]; // Copy of selected answers
        newAnswers[currentIndex] = { // Stores the user sected answer in a format
            question: questions[currentIndex].description,
            selected: optionObj.description,
            correct: questions[currentIndex].options.find(opt => opt.is_correct)?.description,
            solution: questions[currentIndex].detailed_solution,
        };
        setSelectedAnswers(newAnswers); // Updates the state
        localStorage.setItem("quizAnswers", JSON.stringify(newAnswers)); // Stores the answer
        if (optionObj.is_correct) {
            setScore((prev) => prev + 4); // Increase the score if correct
        } else {
            setScore((prev) => prev - 1); // Decrease the score if wrong
        }
        setTimeout(() => {
            handleNextQuestion();
        }, 1000); // Move to the next question after 1 second
    };

    // This code works for the locked question.
    const lockQuestionAndMoveNext = () => {
        if (!lockedQuestions.includes(currentIndex)) {
          setLockedQuestions((prev) => [...prev, currentIndex]); // Mark question as attempted
        }
        if (lockedQuestions.length + 1 === questions.length) { // Check if all questions are answered
          onQuizEnd(score); // Automatically end the quiz
        } else {
          handleNextQuestion();
        }
    };

    // Moves to the next question
    const handleNextQuestion = () => {
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex((prev) => prev + 1);
            setTimeLeft(30);
        } else {
            onQuizEnd(score, questions.length); // If no question is left then store the score and number of questions
        }
    };

    // If question is locked, then jump to the next question with timer
    const handleQuestionJump = (index) => {
        if (!lockedQuestions.includes(index)) {
            setCurrentIndex(index);
            setTimeLeft(30);
        }
    };

    // Loader if no data is fetched from API
    if (!questions.length) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
            <div className="max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold text-gray-600">Score:</span>
                            <span className={`text-xl font-bold ${score >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {score}
                            </span>
                        </div>
                        {/* Time Given for every question:30 seconds */}
                        <div className={`flex items-center space-x-2 ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-gray-600'
                            }`}>
                            <Clock className="w-5 h-5" />
                            <span className="text-xl font-bold">{timeLeft}sec</span>
                        </div>
                    </div>
                    {/* Time Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${(timeLeft / 30) * 100}%` }}></div>
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                    <div className="mb-6">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                            {questions[currentIndex].topic}
                        </span>
                        <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
                            {questions[currentIndex].description}
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {questions[currentIndex].options.map((optionObj, index) => {
                            const isSelected = selectedAnswers[currentIndex]?.selected === optionObj.description;
                            const isCorrect = optionObj.is_correct;
                            return (
                                <button
                                    key={index}
                                    onClick={() => !selectedAnswers[currentIndex] && handleAnswerClick(optionObj)}
                                    disabled={selectedAnswers[currentIndex]}
                                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center space-x-3
                    ${isSelected
                                            ? isCorrect
                                                ? 'border-green-500 bg-green-50 text-green-700'
                                                : 'border-red-500 bg-red-50 text-red-700'
                                            : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                                        }
                    ${selectedAnswers[currentIndex] ? 'cursor-default' : 'cursor-pointer'}
                  `}>
                                    {isSelected && (
                                        isCorrect
                                            ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                    )}
                                    <span className="text-left">{optionObj.description}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
                {/* Navigation */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-medium text-gray-500">
                            Question {currentIndex + 1} of {questions.length}
                        </span>
                        <div className="flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-600">Click numbers to jump to questions</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {questions.map((_, index) => {
                            const isCurrentQuestion = index === currentIndex;
                            const isAnswered = selectedAnswers[index];
                            const isLocked = lockedQuestions.includes(index);
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleQuestionJump(index)}
                                    disabled={isLocked}
                                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-200
                    ${isCurrentQuestion
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : isAnswered
                                                ? 'bg-green-100 text-green-800 border-2 border-green-500'
                                                : isLocked
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                    {index + 1}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
