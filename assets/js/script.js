// Variables for questions
var intro = document.getElementById("intro_page");
var goBtn = document.getElementById("goBtn");
var backBtn = document.getElementById("back-btn")

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

// Timer

var timerElement = document.getElementById("timer")
var timeLeft = 60;
var qNumber = 0;
var score = 0;
var qCount = 1;

// Timer: When I click the start button, then the timer starts. 
// If timer runs out display score instead.

function time() {
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

// if game ends before answering all questions correctly or if timed out. Game ends.
// when game ends show total points earned
function gameOver() {
    questionsPage.style.display = "none";
    scoreArea.style.display = "block";
    finalScore.textContent = "You've earned " + score + " points!";
    timerElement.style.display = "none";
};

// Starting the quiz.
function start() {
    intro.style.display = "none";
    questionsPage.style.display = "block";
    goBtn.style.display = "none";
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
        score = score++;
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

// Store and get scores
function storeScores(event) {
    event.preventDefault();

    // if no initials
    if (initials.value === "") {
        alert("Please enter your initials to proceed.");
        return;
    }

    timer.style.display = "none";
    checker.style.display = "none";
    scoreArea.style.display = "block";

    var savedScores = localStorage.getItem("high scores");
    var scoreArray;

    if (savedScores == null) {
        scoreArray = [];
    }
    else {
        scoreArray = JSON.parse(savedScores)
    }

    var playerScore = {
        initial: initials.value,
        score: finalScore.textContent
    };

    scoreArray.push(playerScore);

    // stringify
    var scoreString = JSON.stringify(scoreArray);
    window.localStorage.setItem("high scores", scoreString);

    // display all scores
    showScores();
}

function showScores() {
    scoreArea.style.display = "none";
    scorePage.style.display = "block";


    var savedScores = localStorage.getItem("high scores");

    if (savedScores === null) {
        return;
    }

    var storedScores = JSON.parse(savedScores);

    for (var i; i < storedScores.length; i++) {
        var newHighscore = document.createElement("li");
        newHighscore.innerHTML = storedScores[i].initial + ": " + storedScores[i].score;
        leaderboard.appendChild(newHighscore);

    }
}

// Event listeners

goBtn.addEventListener("click", start);
answer1.addEventListener("click", pick1);
answer2.addEventListener("click", pick2);
answer3.addEventListener("click", pick3);
answer4.addEventListener("click", pick4);

submit.addEventListener("click", function (event) {
    storeScores(event);
}
)

var viewLeaderboard = document.getElementById("scoring")
viewLeaderboard.addEventListener("click", function () {
    showScores();
    questionsPage.style.display = "none";
    intro.style.display = "none";
    goBtn.style.display = "none";
})

backBtn.addEventListener("click", function() {
    intro.style.display = "block";
    scorePage.style.display = "none";
    questionsPage.style.display = "none";
    goBtn.style.display = "block";
});
