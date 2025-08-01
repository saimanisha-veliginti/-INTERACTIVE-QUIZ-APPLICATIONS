const questions = [
  {
    question: "What is the capital of Japan?",
    answers: [
      { text: "Tokyo", correct: true },
      { text: "Beijing", correct: false },
      { text: "Seoul", correct: false },
      { text: "Bangkok", correct: false }
    ]
  },
  {
    question: "Which company developed JavaScript?",
    answers: [
      { text: "Netscape", correct: true },
      { text: "Microsoft", correct: false },
      { text: "Google", correct: false },
      { text: "Apple", correct: false }
    ]
  },
  {
    question: "Which tag is used to link CSS in HTML?",
    answers: [
      { text: "<style>", correct: false },
      { text: "<css>", correct: false },
      { text: "<link>", correct: true },
      { text: "<script>", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreDisplay.innerText = `Score: ${score}`;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(button, isCorrect) {
  const allButtons = answerButtons.children;
  for (let btn of allButtons) {
    btn.disabled = true;
    const correct = questions[currentQuestionIndex].answers.find(a => a.correct).text;
    if (btn.innerText === correct) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("wrong");
    }
  }

  if (isCorrect) {
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
  }

  button.classList.add(isCorrect ? "correct" : "wrong");
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showFinalScore();
  }
});

function showFinalScore() {
  resetState();
  questionContainer.innerText = `Quiz Completed!`;
  const scoreMessage = document.createElement("div");
  scoreMessage.innerText = `You scored ${score} out of ${questions.length}`;
  answerButtons.appendChild(scoreMessage);

  nextButton.innerText = "Restart";
  nextButton.style.display = "block";
  nextButton.onclick = startQuiz;
}

startQuiz();
