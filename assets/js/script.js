// Variables for questions
var intro = document.getElementById("intro_page");
var goBtn = document.getElementById("goBtn");

var questionsPage = document.getElementById("question-box");
var qustionAsk = document.getElementById("ask-question");

var answers = document.getElementsByClassName("answers")
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");


var checker = document.getElementById("check-answer");

// Questions
var qSource = [
    {
        question: "The condition of a function is wrapped with a ____.",
        choices: ["quotation marks", "curly brackets", "parentheses", "square Brackets"],
        answer: "parentheses",
    },

    {
        question: "String values are found between what?",
        choices: ["semi-colons", "curly brackets", "periods", "quotation marks"],
        answer: "quotation marks",

    },

    {
        question: "Commonly used data types DO NOT include?",
        choices: ["strings", "booleons", "functions", "numbers"],
        answer: "functions",

    },

    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["<script>", "<js>", "<body>", "<footer>"],
        answer: "<script>",

    },

    {
        question: "What is the correct syntax to refer to a script file?",
        choices: ["<script name= >", "<script js= >", "<script href= >", "none of the above"],
        answer: "none of the above",

    },

    {
        question: "A useful debugging tool during development for printing content to the console area is?",
        choices: ["terminal", "console log", "git bash", "return;"],
        answer: "console log",

    }];

// Timer
var timer = document.getElementById("timer");
var timerElement = document.getElementById("timer")
var timeLeft = 60;
var qNumber = 0;
var finalScore = 0;
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

// Starting the quiz.
function start() {
    intro.style.display = "none";
    questionsPage.style.display = "contents";
    goBtn.style.display = "none";
    qNumber = 0;
    time();
    showQuestion(qNumber);
};

// Call on Question & Answers
function showQuestion(n) {
    qustionAsk.textContent = qSource[n].question; 
    answer1.textContent = qSource[n].choices[0];
    answer2.textContent = qSource[n].choices[1];
    answer3.textContent = qSource[n].choices[2];
    answer4.textContent = qSource[n].choices[3];
    n = qNumber;
};

// // If answer is right or wrong, display.
// function check(event) {
//     // display checked answer
//     event.preventDefault();
//     checkArea.style.display = "block";
//     // how long display last
//     setTimeout(function () {
//         checkArea.style.display = "none";
//     }, 1000);

//     // actual checking
//     if (qs[qNumber].answers == event.target.value) {
//         checkArea.textContent = "Yay!";
//         score = score + 1;
//     }
//     else {
//         secondsLeft = secondsLeft - 5;
//         checkArea.textContent = "Opps!";
//     }
//     if (qNumber < qs.length - 1) {
//         // if question number is less than the length still, get a new question.
//         showQuestions(qNumber + 1)
//     }
//     else {
//         gameOver();
//     }
//     qCount++;
// };

// // Store and get scores
// function getScore() {
//     var currentScore = localStorage.getItem("Points");
//     if (currentScore !== null) {
//         points = JSON.parse(currentScore);
//         return points;
//     }
//     else {
//         score = [];
//     }
//     return score;
// };

// // show the score
// function showScore() {
//     scoreArea.innerHTML = "";
//     scoreArea.style.display = "block";
//     var topScore = sort();
//     var topThree = topScore.slice(0, 3);
//     for (var i = 0; i < topThree.length; i++) {
//         var r = topThree[i];
//         var li = document.createElement("li");
//         li.textContent = r.user + " - " + r.score;
//         li.setAttribute("score-area", i);
//         scoreArea.appendChild(li);
//     }
// };

// // Sort score by highest point and display list
// function sort() {
//     var list = getScore();
//     if (getScore == null) {
//         return;
//     }
//     else {
//         list.sort(function (a, b) {
//             return b.score - a.score;
//         }
//         )
//         return list;
//     }
// };

// function updatedList(e) {
//     var addList = getScore();
//     addList.push(e);
//     localStorage.setItem("Points", JSON.stringify(addList));
// };

// function save() {
//     var rank = {
//         user: userInitial.value,
//         score: score,
//     }
//     addItem(rank);
//     getScore();
// }

// // if game ends before answering all questions correctly or if timed out. Game ends.
// function gameOver() {
//     questions.style.display = "none";
//     score.style.display = "block";
//     scoreTotal.textContent = "Your score is: " + total;
//     timeLeft.style.display = "none";
// };


// // Event listeners

goBtn.addEventListener("click", start);
// answer1.addEventListener("click", chooseA);
// answer2.addEventListener("click", chooseB);
// answer3.addEventListener("click", chooseC);
// answer4.addEventListener("click", chooseD);

