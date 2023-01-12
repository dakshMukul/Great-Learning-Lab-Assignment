// Quiz Prototype
function Quiz(question) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}
Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}
Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

// Quistion Prototype
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}

// Quiz dispay and score display
function loadQuestions() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionByIndex().text;

        // show options
        var choices = quiz.getQuestionByIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i]);

            // show options
            showProgress();
        }
    }
}

// handle event and load next question
function handleOptionButton(id, choice) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}

// show progress bar
function showProgress() {
    var currentQuestionNum = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = ("Question " + currentQuestionNum + " of  " + quiz.questions.length);
}

// show result
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<H2 id='score'>Your Score: " + quiz.score + "</h2>";
    gameOverHTML += "<h2 id='score'> And mark percentage is: " + (quiz.score / questions.length * 100) + " %" + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
}

// create questions here
var questions = [
    new Question("JavaScript supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "Xml"], "CSS"),
    new Question("Which is not JavaScript Framework?", ["Python Script", "JQuery", "Django", "Nodejs"], ""),
    new Question("Which is used for connet to database?", ["PHP", "HTML", "JS", "ALL"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programing Language", "Development", "All"], "Programing Language"),
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
loadQuestions();
