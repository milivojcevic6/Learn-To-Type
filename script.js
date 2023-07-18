var words = []; // Array to store falling words
var wordElements = []; // Array to store falling word elements
var score = 0; // Player's score

// Function to generate a random word
function getRandomWord() {
    var wordList = ["apple", "banana", "cat", "dog", "elephant"]; // Example word list
    return wordList[Math.floor(Math.random() * wordList.length)];
}

// Function to create a falling word element
function createFallingWord() {
    var word = getRandomWord();
    var wordElement = document.createElement("div");
    wordElement.innerText = word;
    wordElement.className = "falling-word";
    wordElement.style.left = Math.random() * 90 + "vw"; // Random horizontal position
    wordElement.style.animationDuration = Math.random() * 2 + 20 + "s"; // Random falling speed
    document.getElementById("falling-words").appendChild(wordElement);

    // Add the word and its element to the arrays
    words.push(word);
    wordElements.push(wordElement);
}

// Function to update the score
function updateScore() {
    document.getElementById("score").innerText = "Score: " + score;
}

// Function to handle user input
function handleUserInput() {
    var userInput = this.value; // Use value to get the input content

    // Check if the user input matches any falling words
    var index = words.findIndex(word => word === userInput);
    if (index > -1) {
        // Remove the matched word and its element
        words.splice(index, 1);
        var removedWordElement = wordElements.splice(index, 1)[0];
        removedWordElement.remove();

        score++; // Increase the score
        updateScore();

        // Clear the user input field
        this.value = "";
    }
}

// Event listener for user input
document.getElementById("user-input").addEventListener("input", handleUserInput);

// Start the game
function startGame() {
    setInterval(createFallingWord, 1000); // Create a falling word every 1 second
}

startGame();
