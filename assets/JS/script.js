const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerButtonsEl = document.getElementById("answer-buttons");
const initialsInput = document.getElementById("initialsInput");
const remainingTime = document.getElementById("remainingTime");
var timerEl = document.getElementById("countdown");
const scoreContainerEl = document.getElementById("score-container");
const submitButton = document.getElementById("submit-btn");
const questionCounter = document.getElementById("questions-correct");
const body = document.querySelector("body");
let shuffledQuestions, currentQuestionIndex;
var timeLeft = 30;
var questionsCorrect = 0;

startButton.addEventListener("click", startGame);

answerButtonsEl.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startTimer() {
  var timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = timeLeft + " seconds remaining";
      timeLeft--;
    } else {
      timerEl.textContent = "End of Quiz";
      questionContainerElement.classList.add("hide");
      scoreContainerEl.classList.remove("hide");
    }
  }, 1000);
}

function subtractTime() {
  timeLeft -= 5;
}
function resetTime() {
  timeLeft = 0;
}

body.addEventListener("click", function (event) {
  if (event.target.classList.contains("wrong")) {
    console.log(event.target);
    subtractTime();
  }
});

body.addEventListener("click", function (event) {
  if (event.target.classList.contains("correct")) {
    questionsCorrect++;
    questionCounter.innerText = "Score " + questionsCorrect;
  }
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
  startTimer();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsEl.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsEl.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
  } else {
    resetTime();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question:
      "Which of the following keywords is used to define a variable in Javascript?",
    answers: [
      { text: "var", correct: true },
      { text: "function", correct: false },
    ],
  },
  {
    question:
      "Which of the following methods can be used to display data in some form using Javascript?",
    answers: [
      { text: "console.log()", correct: false },
      { text: "document.write()", correct: false },
      { text: "window.alert()", correct: false },
      { text: "all of the above", correct: true },
    ],
  },
  {
    question: "How can a dataype be declared to be a constant type?",
    answers: [
      { text: "var", correct: false },
      { text: "const", correct: true },
      { text: "let", correct: false },
      { text: "constant", correct: false },
    ],
  },
  {
    question: "What is the full form of DOM?",
    answers: [
      { text: "Data Object Model", correct: false },
      { text: "Document Object Meduim", correct: false },
      { text: "Document Object Model", correct: true },
      { text: "Document or Model", correct: false },
    ],
  },
  {
    question: "Java Script File Has An Extension Of",
    answers: [
      { text: ".xml", correct: false },
      { text: ".Java", correct: false },
      { text: ".js", correct: true },
      { text: ".javascript", correct: false },
    ],
  },
];

submitButton.onclick = function () {
  const initials = initialsInput.value;
  const score = remainingTime.value;

  localStorage.setItem(initials, score);
};
