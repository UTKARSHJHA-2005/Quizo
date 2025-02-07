import React, { useState } from "react";
import Start from "./pages/Start"; // Start Page
import Quiz from "./pages/Quiz"; // Quiz Page
import Result from "./pages/Result"; // Result Page

const App = () => {
  const [step, setStep] = useState("start"); // Starting should be from start page
  const [score, setScore] = useState(0); 

  // Start Quiz
  const startQuiz = () => setStep("quiz"); 
  
  // Record the score when quiz ends
  const endQuiz = (finalScore) => { 
    setScore(finalScore); // Set the score earned by user
    setStep("result");
  };

  // Restart Quiz by again going to start page
  const restartQuiz = () => { 
    localStorage.removeItem("quizAnswers"); // Removes answers from localstorage
    setScore(0); // Set the score 0
    setStep("start");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {step === "start" && <Start onStart={startQuiz} />} {/* Start Page */}
      {step === "quiz" && <Quiz onQuizEnd={endQuiz} />} {/* Quiz Page */}
      {step === "result" && <Result score={score} onRestart={restartQuiz} />} {/* Result Page */}
    </div>
  );
};

export default App;
