const questionContainerEl = document.querySelector("#question-container");

const startButtonEl = document.querySelector("#start-btn");
const nextButtonEl = document.querySelector("#next-btn");

const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answer-button");

const containerEl = document.querySelector(".container");

let shuffledQuestions, currentQuestionIndex;

let clockRunner;

timerStart = 10

const timerEl = document.querySelector("#timer");

startButtonEl.addEventListener("click", startGame);



function startGame() {
    clockRunner = setInterval(decriment, 1000);
    startButtonEl.classList.add("hide");
    shuffledQuestions = questionArr.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove("hide");
    setNextQuestion();
};

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answersEl.appendChild(button);
    })
};

function resetState() {
    clearStatusClass(document.body);
    
    while(answersEl.firstChild) {
        answersEl.removeChild(answersEl.firstChild);
    }
};

function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    
    Array.from(answersEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1) {
        setTimeout(() => {
            currentQuestionIndex++;
            setNextQuestion(); 
        }, 500)
        
    }
    else{
        clearInterval(clockRunner);
        // startButtonEl.innerText = "Restart";
        // startButtonEl.classList.remove("hide");
        endGame();
    }
};

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if(correct) {
        element.classList.add("correct");
    }
    else{
        element.classList.add("wrong");
    }
};

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
};

function decriment(){
    timerStart--;
    timerEl.textContent = "Timer: " + timerStart;
    if(timerStart < 0){
        timerStart = 0;
        timerEl.textContent = "Timer: " + timerStart;
    }
}

function endGame(){
    //clear out questions/buttons
    questionContainerEl.classList.add("hide");
    //capture time remaining
    //collect number correct
    //get highscore
    //save highscore to local storage
    var highScoreContainer = document.querySelector(".highScoreContainer");
    highScoreContainer.classList.remove("hide");
    //show list of highscores
}

const questionArr = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            { text: "strings", correct: false},
            { text: "booleans", correct: false},
            { text: "alerts", correct: true},
            { text: "numbers", correct: false}
        ]
    },
    {
        question: "The condition in an if/else statement is enclosed with _________.",
        answers: [
            { text: "quotes", correct: false},
            { text: "parenthesis", correct: true},
            { text: "curly brackets", correct: false},
            { text: "square brackets", correct: false}
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store _________.",
        answers: [
            { text: "numbers and strings", correct: false},
            { text: "other arrays", correct: false},
            { text: "booleans", correct: false},
            { text: "all of the above", correct: true}
        ]
    },
    {
        question: "String values must be enclosed with _______ when being assigned to variabels",
        answers: [
            { text: "quotes", correct: true},
            { text: "commas", correct: false},
            { text: "curly brackets", correct: false},
            { text: "parenthesis", correct: false}
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "JavaScript", correct: false},
            { text: "terminal/bash", correct: false},
            { text: "for loops", correct: false},
            { text: "console.log", correct: true}
        ]
    }
]