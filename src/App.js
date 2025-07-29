import React, { useState } from 'react';
import Quiz from './components/Quiz';
// import Quiz from './components/Quiz2';
import './App.css';
import Result from './components/Result';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [quiz, setQuiz] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem('highScore')) || 0;
  });

  const handleFinish = (finalScore) => {
    setScore(finalScore);
    setQuiz(false);
    if (finalScore > highScore) {
      localStorage.setItem('highScore', finalScore);
      setHighScore(finalScore);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setQuiz(true);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
      <h3 className="mb-3">High Score: {highScore}</h3>
      {quiz ?
        // <Quiz onFinish={handleFinish} />
        <Quiz onFinish={handleFinish} />
        : <Result score={score} onRestart={handleRestart} highScore={highScore} />}
    </div>
  );
}

export default App;
