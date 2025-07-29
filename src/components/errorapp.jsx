import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card } from "react-bootstrap";
import { motion } from 'framer-motion';
import questions from './Questions';
import '../App.css';

function Quiz({ onFinish }) {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null);
    const [timeLeft, setTimeLeft] = useState(5);

    const handleAnswer = useCallback((selectedIdx) => {
        const correctIndex = questions[current].correctIndex;
        setSelected(selectedIdx);

        const isCorrect = selectedIdx !== null && selectedIdx === correctIndex;
        const nextScore = isCorrect ? score + 1 : score;
        setScore(nextScore);

        setTimeout(() => {
            if (current < questions.length - 1) {
                setCurrent(prev => prev + 1);
                setSelected(null);
            } else {
                onFinish(nextScore);
            }
        }, 1000);
    }, [current, score, onFinish]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleAnswer(null);
            return;
        }
        const timer = setTimeout(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, handleAnswer]);

    useEffect(() => {
        setTimeLeft(5);
    }, [current]);

    return (
        <div className="d-flex justify-content-center mt-5">
            <Card className="p-4 shadow text-center" style={{ width: '100%', maxWidth: '500px' }}>
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className='mb-4'>Question {current + 1} of {questions.length}</h2>
                    <h4 className='mb-4'>{questions[current].question}</h4>

                    {questions[current].options.map((option, idx) => {
                        let className = "";
                        if (selected !== null) {
                            if (idx === questions[current].correctIndex) className += " correct";
                            else if (idx === selected) className += " wrong";
                        }

                        return (
                            <div key={idx} className="mb-2">
                                <Button
                                    className={className}
                                    variant="outline-primary"
                                    onClick={() => handleAnswer(idx)}
                                    disabled={selected !== null}
                                    style={{ width: "100%", textAlign: "left" }}
                                >
                                    {option}
                                </Button>
                            </div>
                        );
                    })}

                    <h5 className="mb-2 text-danger">⏳ Time Left: {timeLeft} sec</h5>
                </motion.div>
            </Card>
        </div>
    );
}

export default Quiz;
