import React, { useState, useEffect } from "react";
import Start from "./pages/Start"; // Start Page
import Quiz from "./pages/Quiz"; // Quiz Page
import Result from "./pages/Result"; // Result Page
import Profile from "./pages/Profile"; // Profile Page

const App = () => {
  const [step, setStep] = useState("start"); // First step should be start page
  const [score, setScore] = useState(0); // Score earned
  const [quizHistory, setQuizHistory] = useState([]); // Quiz History

  // Stores the history of the user.
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    setQuizHistory(storedHistory);
  }, []);

  const startQuiz = () => setStep("quiz"); // This helps to go to quiz page 

  // When the quiz ends, we get the final score.
  const endQuiz = (finalScore) => {
    setScore(finalScore);
    const updatedHistory = [...quizHistory, { score: finalScore, date: new Date().toLocaleDateString() }];
    setQuizHistory(updatedHistory);
    localStorage.setItem("quizHistory", JSON.stringify(updatedHistory)); // Store progress
    setStep("result");
  };

  // Restart the quiz
  const restartQuiz = () => {
    setScore(0);
    setStep("start");
  };

  // To view the progress of the user
  const Profileset=()=>{
    setStep("profile");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {step === "start" && <Start onStart={startQuiz} onProfile={Profileset}/>}
      {step === "quiz" && <Quiz onQuizEnd={endQuiz} />}
      {step === "result" && <Result score={score} onRestart={restartQuiz} />}
      {step === "profile" && <Profile quizHistory={quizHistory} />}
    </div>
  );
};

export default App;
