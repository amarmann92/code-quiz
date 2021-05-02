const intro = $("#intro");
const questions = $("#questions");
const scores = $("#scores");
const correct = $("#correct");
const incorrect = $("#incorrect");
const timer = $("#timer");

const questionList = [
  {
    question: "JavaScript is a single threaded programming language.",
    answer: "true",
  },
  {
    question: "Boolean value represent values stored in a linked list.",
    answer: "false",
  },
  {
    question: "Javascript is based off of the Java coding language.",
    answer: "false",
  },
  {
    question: "JavaScript can only be used for front end applications.",
    answer: "false",
  },
  {
    question: "Object data types hold key/value pairs of associated data.",
    answer: "true",
  },
  {
    question:
      "A 'for' loop and a 'forEach' loop are essentially the same thing",
    answer: "false",
  },
  {
    question: "jQueezy is a JavaScript library",
    answer: "false",
  },
  {
    question: "In JavaScript, we use '===' to assign values",
    answer: "false",
  },
  {
    question: "JavaScript will never ask for your password",
    answer: "true",
  },
  {
    question: "All websites include at least some JavaScript functionality",
    answer: "false",
  },
];

let countdown;
let questionIndex = 0;
let timeLeft = 59;
let scoreArray = JSON.parse(localStorage.getItem("scores")) || [];

function init() {
  intro.addClass("hidden");
  questions.removeClass("hidden");
  $("#timeEl").removeClass("hidden");

  $(".scoreList").empty();
  if (scoreArray) {
    for (let i = 0; i < scoreArray.length; i++) {
      const listScore = $("<li>").text(
        `${scoreArray[i].initials}: ${scoreArray[i].score}`
      );
      $(".scoreList").append(listScore);
    }
  }

  countdown = setInterval(() => {
    timer.text(timeLeft);
    if (timeLeft > 0) {
      timeLeft--;
    } else {
      timeLeft = 0;
      clearInterval(countdown);
      endGame();
    }
  }, 1000);
  displayQ();
}

function displayQ() {
  questions.empty();
  const qEl = $("<h2>").text(questionList[questionIndex].question);
  const buttonDiv = $("<div>");
  const tButton = $("<button>")
    .text("True")
    .addClass("btn btn-primary m-1 answer");
  const fButton = $("<button>")
    .text("False")
    .addClass("btn btn-primary m-1 answer");
  buttonDiv.append(tButton, fButton);
  questions.append(qEl, buttonDiv);
  $(".answer").on("click", checkAnswer);
}

function checkAnswer(e) {
  const answer = e.target.textContent.toLowerCase();
  if (answer == questionList[questionIndex].answer) {
    correct.removeClass("hidden");
    setTimeout(() => {
      correct.addClass("hidden");
      questionIndex++;
      if (questionIndex >= questionList.length) {
        clearInterval(countdown);
        return endGame();
      }
      displayQ();
    }, 500);
  } else {
    incorrect.removeClass("hidden");
    timeLeft -= 9;
    setTimeout(() => {
      incorrect.addClass("hidden");
      questionIndex++;
      if (questionIndex >= questionList.length) {
        clearInterval(countdown);
        return endGame();
      }
      displayQ();
    }, 500);
  }
}

function endGame() {
  if (timeLeft < 0) timeLeft = 0;
  timer.text(timeLeft);
  questions.addClass("hidden");
  $(".initial-entry").removeClass("hidden");
  scores.removeClass("hidden");
}

// Event Listener for 'Start' button
$("#start").on("click", init);

// Event Listener for Initials Submit button
$("#score-submit").on("click", () => {
  const initials = $("#initials").val().toUpperCase();
  const scoreEntry = {
    initials,
    score: timer.text(),
  };
  scoreArray.push(scoreEntry);
  localStorage.setItem("scores", JSON.stringify(scoreArray));
  $(".initial-entry").addClass("hidden");
});

// Event Listener for 'Play Again' button
$("#play").on("click", () => {
  scores.addClass("hidden");
  timeLeft = 59;
  questionIndex = 0;
  init();
});
