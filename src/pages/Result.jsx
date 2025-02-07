// This is the Result page which gets in view when the quiz ends.
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper
import { Navigation } from "swiper/modules"; // Swiper modules
import { Trophy, Book, RefreshCcw, Check, X, LightbulbIcon } from "lucide-react"; // Icons
import "swiper/css";
import "swiper/css/navigation";

const Result = ({ score, onRestart }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]); // Track selected answers
  const maxScore = 40; // Maximum Score of the Quiz
  
  // This takes the answers stored in localstorage by firstly checking that the stored answers are array or not and then displaying the answer.
  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem("quizAnswers")) || [];
    if (Array.isArray(storedAnswers) && storedAnswers.length > 0) {
      setSelectedAnswers(storedAnswers);
    } else {
      setSelectedAnswers([]);
    }
  }, []);
  
  // Message based on the score
  const getScoreMessage = (score) => {
    if (score >= 35) return <div className="text-emerald-600">Outstanding Performance! 🌟</div>;
    if (score >= 25 && score < 35) return <div className="text-green-600">Great Job! 🏆</div>;
    if (score >= 15 && score < 25) return <div className="text-yellow-600">Good Effort! 👍</div>;
    return <div className="text-red-600">Keep Practicing! 💪</div>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Score Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
          {/* Score Display */}
          <div className="flex flex-col items-center space-y-4">
            <div className="text-2xl">
              Your Score:{" "}
              <span className="font-bold">
                {score+4} / {maxScore}
              </span>
            </div>
            <div className={`text-xl font-medium`}>
              {getScoreMessage(score)}
            </div>
            {/* Score Meter */}
            <div className="w-full max-w-md bg-gray-200 rounded-full h-4 mt-4">
              <div className={`h-4 rounded-full ${score >= 35
                  ? "bg-emerald-500"
                  : score >= 25 && score < 35
                    ? "bg-green-500"
                    : score >= 15 && score < 25
                      ? "bg-yellow-500"
                      : "bg-red-500"}`}
                style={{ width: `${(score / maxScore) * 100}%` }}></div>
            </div>
          </div>
        </div>
        {/* Review Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Book className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-2xl font-bold">Review Your Answers</h3>
          </div>
          {selectedAnswers.length > 0 ? (
            <Swiper navigation={true} modules={[Navigation]} spaceBetween={20} slidesPerView={1} className="h-[600px]">
              {selectedAnswers.map((item, index) => (
                item && item.question ? (
                  <SwiperSlide key={index}>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 h-full overflow-y-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">Question {index + 1}/{selectedAnswers.length}</span>
                        {item.selected === item.correct ? (
                          <span className="flex items-center text-green-600">
                            <Check className="w-5 h-5 mr-1" />
                            Correct
                          </span>
                        ) : (
                          <span className="flex items-center text-red-600">
                            <X className="w-5 h-5 mr-1" />
                            Incorrect
                          </span>
                        )}
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold mb-4">{item.question}</h4>
                          <div className="space-y-4">
                            <div className={`p-4 rounded-lg ${item.selected === item.correct
                                ? "bg-green-100 border border-green-200"
                                : "bg-red-100 border border-red-200"
                              }`}>
                              <div className="text-sm font-medium text-gray-600 mb-2">Your Answer:</div>
                              <div className="font-medium">{item.selected || "No answer given"}</div>
                            </div>
                            <div className="bg-emerald-100 border border-emerald-200 p-4 rounded-lg">
                              <div className="text-sm font-medium text-gray-600 mb-2">Correct Answer:</div>
                              <div className="font-medium">{item.correct}</div>
                            </div>
                          </div>
                        </div>
                        {/* Explanation of the Solution */}
                        {item.solution && (
                          <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg">
                            <div className="flex items-center mb-3">
                              <LightbulbIcon className="w-5 h-5 text-blue-600 mr-2" />
                              <div className="text-lg font-medium text-blue-800">Detailed Explanation</div>
                            </div>
                            <div className="text-gray-700 prose max-w-none">
                              {item.solution.split('\n').map((paragraph, i) => (
                                <p key={i} className="mb-3">{paragraph}</p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ) : null
              ))}
            </Swiper>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No answers recorded.
            </div>
          )}
        </div>
        {/* Restart Button */}
        <div className="text-center mt-8">
          <button onClick={() => {
            localStorage.removeItem("quizAnswers");
            onRestart();
          }}
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg text-lg transform hover:scale-105 font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
            <RefreshCcw className="w-5 h-5 mr-2" />
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result; 