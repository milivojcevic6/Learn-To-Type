import React, {useState, useEffect, useRef} from 'react';
import './game.css';

const Game = () => {
    const [words, setWords] = useState([]); // Array to store falling words
    const [score, setScore] = useState(0); // Player's score
    const [gameStarted, setGameStarted] = useState(false); // Flag to track if the game has started
    const [isGameOver, setIsGameOver] = useState(false); // Flag to track if the game is over
    const [isPaused, setIsPaused] = useState(false); // Flag to track if the game is paused
    const [wordSpeed, setWordSpeed] = useState(1);
    const lineRef = useRef(null);

    
    // Function to generate a random word
    const getRandomWord = () => {
        const wordList = ["apple", "banana", "cat", "dog", "elephant"]; // Example word list
        return wordList[Math.floor(Math.random() * wordList.length)];
    };

    // Function to create a falling word object
    const createFallingWord = () => {
        
        if(!isPaused){
            const word = getRandomWord();
            const fallingWord = {
                text: word,
                top: 0,
                left: Math.random() * 90, // Random horizontal position
                isStopped: false,
                animationDuration: Math.random() * 2 + 25, // Random falling speed
            };

            setWords((prevWords) => [...prevWords, fallingWord]);
        }
    };

    // Function to update the score
    const updateScore = () => {
        setScore((prevScore) => prevScore + 1); // Increase the score
    };

    // Function to handle user input
    const handleUserInput = (event) => {
        const userInput = event.target.value; // Use value to get the input content

        // Check if the user input matches any falling words
        const updatedWords = [...words];
        const index = updatedWords.findIndex((word) => word.text === userInput);
        if (index > -1) {
            // Remove the matched word
            updatedWords.splice(index, 1);
            setWords(updatedWords);

            updateScore();

            // Clear the user input field
            event.target.value = '';
        }
    };

    // Function to handle the game over condition
    const handleGameOver = () => {
        setIsGameOver(true);
        setGameStarted(false);
    };

    useEffect(() => {
        const intervalId = setInterval(updateWordPositions, 100); // Call updateWordPositions every 100 milliseconds

        // Clear the interval when the component unmounts or when isGameOver changes
        return () => clearInterval(intervalId);
    }, [isGameOver]);

    const updateWordPositions = () => {
        if (!isPaused) {
            const updatedWords = words.map((word) => {
                if (!word.isStopped) {
                    const updatedWord = { ...word };
                    updatedWord.top += wordSpeed;

                    if (updatedWord.top >= lineRef.current.offsetTop) {
                        updatedWord.isStopped = true;
                        handleGameOver();
                    }

                    return updatedWord;
                }

                return word;
            });

            setWords(updatedWords);
        }
    };


    // Function to start the game
    const startGame = () => {
        setGameStarted(true);
        setIsGameOver(false);
        setWords([]);
        setScore(0);
        setWordSpeed(1);
        
        // Call createFallingWord initially
        createFallingWord();

        // Call createFallingWord every 1000ms
        setInterval(createFallingWord, 1000);
        console.log("line ref is: "+lineRef.current.offsetTop)
    };

    function handlePause() {
        setIsPaused((prevIsPaused) => !prevIsPaused);
    }

    return (
        <div id="game-container">
            {isGameOver ? (
                <div className="game-over">
                    <h1>Game Over</h1>
                    <p>Score: {score}</p>
                </div>
            ) : (
                <>
                    <div id="falling-words">
                        {words.map((word, index) => (
                            <div
                                key={index}
                                className={`falling-word ${word.isStopped ? 'stopped' : ''}`}
                                style={{
                                    top: `${word.top}vh`,
                                    left: `${word.left}vw`,
                                }}
                            >
                                {word.text}
                            </div>
                        ))}
                    </div>
                    <div id="score">Score: {score}</div>
                    {!gameStarted ? (
                        <button className="start-button" onClick={startGame}>
                            Start
                        </button>
                    ) : (
                        <button className="pause-button" onClick={handlePause}>
                            {isPaused ? 'Resume' : 'Pause'}
                        </button>
                    )}
                    <div id="line" ref={lineRef}></div>
                    <input
                        type="text"
                        id="user-input"
                        autoFocus
                        onChange={handleUserInput}
                        disabled={!gameStarted || isGameOver}
                    />
                </>
            )}
        </div>
    );
};

export default Game;
