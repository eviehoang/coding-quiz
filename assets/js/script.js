// Variables for questions
var goBtn = document.getElementById("goBtn");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer1");
var answer3 = document.getElementById("answer1");
var answer4 = document.getElementById("answer1");
var questions = document.querySelector("question-box")

// Questions
var qs = [{
    question: "The condition of a function is wrapped with a ____.",
    answers: ["quotation Marks", "curly Brackets", "parentheses", "square Brackets"],
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
    answers: ["terminal", "git bash", "console log", "return;"],
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

function timeout() {
    var timeInterval = setInterval(function () {

        secondsLeft--;
        timeLeft.textContent = secondsLeft;

        if (secondsLeft = 0) {
            clearInterval(timeInterval);
            timeLeft.textContent = "Oh no!!";
            questions.textContent = "Time is up!";
            gameOver();
        }

        else if (qCount >= questions.length +1){
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000);
}

// Starting the quiz.
function goBtn() {
    
}
