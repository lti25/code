# 27.2.1 (cpy) Develop a simple HTML document for an interactive quiz

1 case failed out of 4.

**D27_S2_A1_Develop a simple HTML document for an interactive quiz**

# revise

```jsx
let currentQuestionIndex = 0;
let score = 0;

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific"
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Jane Austen", "Mark Twain", "J.K. Rowling"],
    answer: "Harper Lee"
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    answer: "100°C"
  }
];

function getCurrentQuestionIndex() {
    return currentQuestionIndex;
}

function setCurrentQuestionIndex(index) {
    currentQuestionIndex = index;
}

function getScore() {
    return score;
}

function setScore(newScore) {
    score = newScore;
}

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    
    if (currentQuestionIndex < questions.length) {
        questionElement.innerHTML = questions[currentQuestionIndex].question;
        optionsElement.innerHTML = '';

        questions[currentQuestionIndex].options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.innerHTML = `
                <input type="radio" name="option" value="${option}">
                <label>${option}</label>
            `;
            optionsElement.appendChild(optionElement);
        });
    } else {
        questionElement.innerHTML = 'Quiz completed!';
        optionsElement.innerHTML = '';
    }
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    const scoreElement = document.getElementById('score');
    if (selectedOption) {
        if (selectedOption.value === questions[currentQuestionIndex].answer) {
            score++;
            scoreElement.textContent = `Score: ${score}`;
        }
        currentQuestionIndex++;
        loadQuestion();
    }
}

// Initial call to load the first question when the page loads
window.onload = loadQuestion;

// Exporting functions for testing
module.exports = {
    loadQuestion,
    submitAnswer,
    questions,
    getCurrentQuestionIndex,
    setCurrentQuestionIndex,
    getScore,
    setScore
};

```

# quiz.html

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Quiz</title>
</head>
<body>
    <p id="question"></p>
    <div id="options"></div>
    <button onclick="submitAnswer()">Submit</button>
    <p id="score">Score: 0</p>

    <script src="quiz.js"></script>
</body>
</html>

```