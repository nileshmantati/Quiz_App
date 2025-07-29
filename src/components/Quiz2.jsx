import React, { useState, useEffect } from 'react';
import questions from './Questions';
// import './Quiz.css';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5);

    useEffect(() => {
        if (showScore) return;

        setTimeLeft(5); // Reset timer on each question

        const timerInterval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        const autoNextTimeout = setTimeout(() => {
            goToNextQuestion();
        }, 5000);

        return () => {
            clearInterval(timerInterval);
            clearTimeout(autoNextTimeout);
        };
    }, [currentQuestion, showScore]);

    const handleAnswer = (option) => {
        if (option === questions[currentQuestion].answer) {
            setScore(score + 1);
        }
        goToNextQuestion();
    };

    const goToNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setTimeLeft(5);
    };

    return (
        <div className="quiz-container">
            {showScore ? (
                <div className="score-section">
                    <h2>Your Score: {score} / {questions.length}</h2>
                    <button onClick={restartQuiz}>Restart Quiz</button>
                </div>
            ) : (
                <div className="question-section">
                    <h2>Question {currentQuestion + 1}/{questions.length}</h2>
                    <p>{questions[currentQuestion].question}</p>
                    <div className="options">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button key={index} onClick={() => handleAnswer(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                    <div className="timer">⏱️ Time left: {timeLeft} sec</div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
