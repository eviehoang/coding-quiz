// Variables for questions
var intro = document.getElementById("intro_page");
var goBtn = document.getElementById("goBtn");
var backBtn = document.getElementById("back-btn")
var clear = document.getElementById("clearScores")

var timerElement = document.getElementById("timer")

var questionsPage = document.getElementById("question-box");
var qustionAsk = document.getElementById("ask-question");

var answers = document.getElementsByClassName("answers")
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");


var checker = document.getElementById("check-answer");

var scoreArea = document.getElementById("scorearea");
var end = document.getElementById("end");
var finalScore = document.getElementById("final-score");
var initials = document.getElementById("initials");
var submit = document.getElementById("submit");
var scorePage = document.getElementById("scorePage")

var leaderboard = document.getElementById("leaderboard");

// Questions
var qSource = [
    {
        questions: "The condition of a function is wrapped with a ____.",
        choices: ["quotation marks", "curly brackets", "parentheses", "square Brackets"],
        answer: "parentheses",
    },

    {
        questions: "String values are found between what?",
        choices: ["semi-colons", "curly brackets", "periods", "quotation marks"],
        answer: "quotation marks",

    },

    {
        questions: "Commonly used data types DO NOT include?",
        choices: ["strings", "booleons", "functions", "numbers"],
        answer: "functions",

    },

    {
        questions: "Inside which HTML element do we put the JavaScript?",
        choices: ["<script>", "<js>", "<body>", "<footer>"],
        answer: "<script>",

    },

    {
        questions: "What is the correct syntax to refer to a script file?",
        choices: ["<script name= >", "<script js= >", "<script href= >", "none of the above"],
        answer: "none of the above",

    },

    {
        questions: "A useful debugging tool during development for printing content to the console area is?",
        choices: ["terminal", "console log", "git bash", "return;"],
        answer: "console log",

    }];


// Timer: When I click the start button, then the timer starts. 
// If timer runs out display score instead.

var timeLeft = 60;
var qNumber = 0;
var totalScore = 0;
var qCount = 1;

function time() {
    timeLeft = 60;
    totalScore = 0;
    qCount = 1;

    var timeInterval = setInterval(function () {
        timeLeft--;
        timerElement.textContent = timeLeft; // Update the timer display

        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            timerElement.textContent = "Oh no!!";
            gameOver();
        } else if (qCount >= qSource.length + 1) {
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000);
};


// Starting the quiz.
function start() {
    // what should display
    intro.style.display = "none";
    questionsPage.style.display = "block";
    goBtn.style.display = "none";
    scoreArea.style.display = "none";
    leaderboard.style.display = "none";

    qNumber = 0;
    time();
    showQuestion(qNumber);
};

// Call on Question & Answers
function showQuestion() {
    qustionAsk.textContent = qSource[qNumber].questions;
    answer1.textContent = qSource[qNumber].choices[0];
    answer2.textContent = qSource[qNumber].choices[1];
    answer3.textContent = qSource[qNumber].choices[2];
    answer4.textContent = qSource[qNumber].choices[3];
};

// If answer is right or wrong, display.
function check(answer) {
    // display checked answer
    checker.style.display = "block";
    // how long display last
    setTimeout(function () {
        checker.style.display = "none";
    }, 1000);

    if (qSource[qNumber].answer === qSource[qNumber].choices[answer]) {
        checker.textContent = "Yay! You got it.";
        totalScore = totalScore + 1;
    }
    else {
        timeLeft = timeLeft - 10;
        timeLeft.textContent = timeLeft;
        checker.textContent = "Opps! Wrong answer.";
    }
    qNumber++;
    // if question number is less than the length still, get a new question.
    if (qNumber < qSource.length) {
        showQuestion();
    }
    else {
        gameOver();
    }
}

// Checking individual answers
function pick1() { check(0); };
function pick2() { check(1); };
function pick3() { check(2); };
function pick4() { check(3); };

// if game ends before answering all questions correctly or if timed out. Game ends.
// when game ends show total points earned
function gameOver() {
    questionsPage.style.display = "none";
    scoreArea.style.display = "block";
    finalScore.textContent = "You've earned " + totalScore + " points!";
    timerElement.style.display = "none";
};

// get current score and initials from local storage
function getScore() {
    var currentList = localStorage.getItem("ScoreList");
    if (currentList !== null) {
        newList = JSON.parse(currentList);
        return newList;
    } else {
        newList = [];
    }
    return newList;
};


// show score to the score board
function showScore() {

    leaderboard.innerHTML = "";
    leaderboard.style.display = "block";

    var savedScores = localStorage.getItem("ScoreList");

    if (savedScores == null) {
        return;
    }

    var storedScores = JSON.parse(savedScores);

    for (var i = 0; i < storedScores.length; i++) {
        var listItem = document.createElement("li");
        listItem.innerHTML = storedScores[i].user + ":" + storedScores[i].score;
        leaderboard.appendChild(listItem);
    }
};

// push new score and initial to the local storage
function addScore(n) {
    var addList = getScore();
    addList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addList));
};

function saveScore() {
    var scoreItem = {
        user: initials.value,
        score: totalScore,
    }
    addScore(scoreItem);
    showScore();
}


// Event listeners

goBtn.addEventListener("click", start);
answer1.addEventListener("click", pick1);
answer2.addEventListener("click", pick2);
answer3.addEventListener("click", pick3);
answer4.addEventListener("click", pick4);

submit.addEventListener("click", function () {
    saveScore();
    scoreArea.style.display = "none";
    scorePage.style.display = "block";
    backBtn.style.display = "block";
    clear.style.display = "block";
});

backBtn.addEventListener("click", function () {
    intro.style.display = "block";
    scorePage.style.display = "none";
    goBtn.style.display = "block";
    backBtn.style.display = "none";
    clear.style.display = "none";
});

clear.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.clear();
    showScore();
});
