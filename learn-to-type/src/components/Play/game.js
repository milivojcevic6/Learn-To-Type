import React, { useState, useEffect, useRef } from 'react';
import './game.css';

const Game = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [words, setWords] = useState([]);
    const [score, setScore] = useState(0);
    const [wordSpeed, setWordSpeed] = useState(50);
    const [wordDelay, setWordDelay] = useState(200);

    const lineRef = useRef(null);
    const userInputRef = useRef(null);
    const intervalIdRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === ' ') {
                event.preventDefault();
                if (gameStarted) {
                    if (isPaused) {
                        setIsPaused(false);
                    }
                } else {
                    setGameStarted(true);
                    setIsPaused(false);
                    setWords([]);
                    setScore(0);
                    setWordSpeed(5);
                    setWordDelay(200);
                }
            } else if (event.key === 'Escape') {
                event.preventDefault();
                setIsPaused(!isPaused);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameStarted, isPaused]);

    useEffect(() => {
        if (gameStarted && !isPaused) {
            intervalIdRef.current = setInterval(() => {
                const newWord = {
                    text: generateRandomWord(),
                    top: 30, // Initial position above the viewport
                    left: Math.random() * 90 + "vw", // Random horizontal position
                };

                setWords((prevWords) => [...prevWords, newWord]);
                console.log("Word Speed: "+wordSpeed)
                console.log("Word Delay: "+wordDelay)
                if((score+1) % 50===0){
                    setWordSpeed((prevSpeed) => prevSpeed + 0.05); // Decrease word falling speed
                    setWordDelay((prevDelay) => prevDelay * 0.95); // Decrease word generation delay
                }
            }, wordDelay);
        } else {
            clearInterval(intervalIdRef.current);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [gameStarted, isPaused, wordDelay]);

    useEffect(() => {
        intervalIdRef.current = setInterval(() => {
            setWords((prevWords) => {
                return prevWords.map((word) => ({
                    ...word,
                    top: word.top + wordSpeed,
                }));
            });
        }, wordDelay);

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [words, wordSpeed]);

    useEffect(() => {
        if (userInputRef.current) {
            userInputRef.current.focus();
        }
    }, [gameStarted, isPaused]);

    const generateRandomWord = () => {
        const wordList = ['apple', 'banana', 'cat', 'dog', 'elephant'];
        return wordList[Math.floor(Math.random() * wordList.length)];
    };

    const handleUserInput = (event) => {
        const userInput = event.target.value.toLowerCase().trim();
        const index = words.findIndex((word) => word.text === userInput);

        if (index > -1) {
            setWords((prevWords) => {
                const updatedWords = [...prevWords];
                updatedWords.splice(index, 1);
                return updatedWords;
            });
            setScore((prevScore) => prevScore + 1);
            event.target.value = '';
        }
    };

    function startGame() {
        
        if (gameStarted) {
            if (isPaused) {
                setIsPaused(false);
            }
        } else {
            setGameStarted(true);
            setIsPaused(false);
            setWords([]);
            setScore(0);
            setWordSpeed(5);
            setWordDelay(1000);
        }
    }

    return (
        <div className = "container">
            {!gameStarted && (
                <div>
                    <h1>Press space to start</h1>
                    <h3>Pause is on Esc</h3>
                </div>
            )}

            {gameStarted && (
                <div>
                    <div className="falling-words">
                        {words.map((word, index) => (
                            <div
                                key={index}
                                className="falling-word"
                                style={{ top: `${word.top}px`, left: `${word.left}` }}
                            >
                                {word.text}
                            </div>
                        ))}
                    </div>

                    <div className="line" ref={lineRef}></div>

                    <input
                        type="text"
                        className="user-input"
                        ref={userInputRef}
                        onChange={handleUserInput}
                        disabled={isPaused}
                    />

                    <div className="score">Score: {score}</div>
                </div>
            )}

            {!gameStarted && !isPaused && (
                <button className="start-button" onClick= {startGame}>
                    Start
                </button>
            )}

            {!gameStarted && (
                <div>
                    <h1>Game Over</h1>
                    <h3>Score is: {score}</h3>
                </div>
            )}
        </div>
    );
};

export default Game;
