// This is the page which will be viewed firstly by the user.
import React from "react";
import { BookOpen, Clock, Award, AlertCircle } from "lucide-react"; // Icons 

const Start = ({ onStart }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
                {/* Welcome Message */}
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
                    Welcome to the QuizTy: The Quiz Starts the Learning !
                </h1>
                {/* Rules for the Quiz */}
                <div className="space-y-6 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Before you begin:
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <Clock className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-gray-700">Time Limit</h3>
                                <p className="text-gray-600">You'll have 30 seconds to complete a question. Make sure you manage your time wisely!</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <BookOpen className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-gray-700">Question Format</h3>
                                <p className="text-gray-600">The quiz consists of multiple-choice questions. Each question has only one correct answer.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Award className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-gray-700">Scoring</h3>
                                <p className="text-gray-600">Each correct answer earns you 4 points and each incorrect answer earns you -1 point. Try to achieve the highest score possible!</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <AlertCircle className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-gray-700">Important Note</h3>
                                <p className="text-gray-600">Once you start, you cannot pause or restart the quiz. Make sure you're ready before beginning.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Start Button with Good Luck Message */}
                <div className="flex flex-col items-center">
                    <button
                        onClick={onStart}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md">
                        Start Quiz
                    </button>
                    <p className="mt-4 font-semibold font-serif text-gray-500 text-sm">
                        Good luck! 🍀
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Start;