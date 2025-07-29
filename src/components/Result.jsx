import React from 'react';
import { Container, Card, Button, Badge } from 'react-bootstrap';
import '../App.css';
import questions from './Questions';

function Result({ score, highScore, onRestart }) {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card className="p-4 shadow text-center" style={{ width: '100%', maxWidth: '500px' }}>
                <Card.Title className="fs-3 mb-4">Quiz Finished!</Card.Title>
                <Card.Text>
                    <p className='mb-2'>Your Score: <Badge>{score}/{questions.length}</Badge></p>
                    <p className='mb-0'>High Score: <strong>{highScore}</strong></p>
                </Card.Text>
                <Button variant="primary" className="mt-3 btn p-2" onClick={onRestart}>Restart Quiz</Button>
            </Card>
        </Container>
    );
};

export default Result;


