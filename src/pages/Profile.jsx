// This is the Profile Page where the user can see the progress of the quiz score.
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"; // Chart Representation
import { Trophy, Clock, ArrowLeft, Award, Target } from "lucide-react"; // Icons

const Profile = ({ quizHistory }) => {
  // Presents the average score of the user.
  const getAverageScore = () => {
    if (!quizHistory.length) return 0;
    return Math.round(quizHistory.reduce((acc, curr) => acc + curr.score, 0) / quizHistory.length); // Gives the round value or average value.
  };

  // Presents the highest score of the user.
  const getHighestScore = () => {
    if (!quizHistory.length) return 0;
    return Math.max(...quizHistory.map(quiz => quiz.score)); // Gives the maximum score earned by the user.
  };

  // Custom tooltip for the chart where the user can see the date and score.
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
          <p className="font-medium text-gray-800">Date: {label}</p>
          <p className="text-blue-600 font-semibold">
            Score: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Quiz Progress</h2>
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-sm font-medium text-gray-600">Total Attempts</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">{quizHistory.length}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Target className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="text-sm font-medium text-gray-600">Average Score</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">{getAverageScore()}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Award className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="text-sm font-medium text-gray-600">Highest Score</h3>
              </div>
              <p className="text-2xl font-bold text-purple-600">{getHighestScore()}</p>
            </div>
          </div>
        </div>
        {/* Chart Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Score History</h3>
          {quizHistory.length > 0 ? (
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={quizHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    tick={{ fill: '#6b7280' }}/>
                  <YAxis 
                    stroke="#6b7280"
                    tick={{ fill: '#6b7280' }}/>
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#4f46e5" 
                    strokeWidth={3}
                    dot={{ fill: '#4f46e5', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl">
              <Trophy className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No quiz history available yet.</p>
              <p className="text-gray-400">Complete your first quiz to see your progress!</p>
            </div>
          )}
        </div>
        {/* Back Button */}
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-110 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Profile;