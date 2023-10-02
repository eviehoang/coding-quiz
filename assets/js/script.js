// Variables for questions
var goBtn = document.getElementById("goBtn");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer1");
var answer3 = document.getElementById("answer1");
var answer4 = document.getElementById("answer1");
var questions = document.querySelector("question-box")

var checkArea = document.getElementById("check-answer");

// Questions
var qs = [{
    question: "The condition of a function is wrapped with a ____.",
    answers: ["quotation Marks", "curly brackets", "parentheses", "square Brackets"],
    correct: "parentheses",

},

{
    question: "String values are found between what?",
    answers: ["semi-colons", "curly brackets", "periods", "quotation marks"],
    correct: "quotation marks",

},

{
    question: "Commonly used data types DO NOT include?",
    answers: ["strings", "booleons", "functions", "numbers"],
    correct: "functions",

},

{
    question: "Inside which HTML element do we put the JavaScript?",
    answers: ["<script>", "<js>", "<body>", "<footer>"],
    correct: "<script>",

},

{
    question: "What is the correct syntax to refer to a script file?",
    answers: ["<script name= >", "<script js= >", "<script href= >", "none of the above"],
    correct: "none of the above",

},

{
    question: "A useful debugging tool during development for printing content to the console area is?",
    answers: ["terminal", "console log", "git bash", "return;"],
    correct: "console log",

},

];

// Timer
var timer = document.getElementById("timer");
var timeLeft = 60;
var qNumber = 0;
var score = 0;
var qCount = 1;

// Timer: When I click the start button, then the timer starts. 
// If timer runs out display score instead.

function time() {
    var timeInterval = setInterval(function () {

        secondsLeft--;
        timeLeft.textContent = secondsLeft;

        if (secondsLeft = 0) {
            clearInterval(timeInterval);
            timeLeft.textContent = "Oh no!!";
            questions.textContent = "Time is up!";
            gameOver();
        }

        else if (qCount >= questions.length + 1) {
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000);
};

// Starting the quiz.
function goBtn() {
    questions.style.display = "none";
    qNumber = 0
    time();
    showQuestions(qNumber);
};

// Call on Question & Answers
function showQuestions(e) {
    questions.textContent = qs[e].question;
    answer1.textContent = qa[e].choices[0];
    answer2.textContent = qa[e].choices[1];
    answer3.textContent = qa[e].choices[2];
    answer4.textContent = qa[e].choices[3];
    qNumber = e;
};

// If answer is right or wrong, display.
function check(event) {
    // display checked answer
    event.preventDefault();
    checkArea.style.display = "block";
    // how long display last
    setTimeout(function () {
        checkArea.style.display = "none";
    }, 1000);

    // actual checking
    if (qs[qNumber].answers == event.target.value) {
        checkArea.textContent = "Yay!";
        score = score + 1;
    }
    else {
        secondsLeft = secondsLeft - 5;
        checkArea.textContent = "Opps!";
    }
    if (qNumber < qs.length - 1) {
        // if question number is less than the length still, get a new question.
        showQuestions(qNumber + 1)
    }
    else {
        gameOver();
    }
    qCount++;
};

// Store and get scores
function getScore(){
    var currentScore = localStorage.getItem("Points");
    if (currentScore !== null){
        points = JSON.parse(currentScore);
        return points;
    }
    else {
        score = [];
    }
    return score;
};

// show the score
function showScore(){
    scoreArea.innerHTML = "";
    scoreArea.style.display = "block";
    var topScore = sort();
    var topThree = topScore.slice(0,3);
    for (var i = 0; i< topThree.length; i++){
        var r= topThree[i];
        var li = document.createElement("li");
        li.textContent = r.user + " - " + r.score;
        li.setAttribute("score-area", i);
        scoreArea.appendChild(li);
    }

};

// Sort score by highest point

// if game ends before answering all questions correctly or if timed out. Game ends.
function gameOver() {
    questions.style.display = "none";
    score.style.display = "block";
    scoreTotal.textContent = "Your score is: " + total;
    timeLeft.style.display = "none";
};



