const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "London", correct: false },
      { text: "Rome", correct: false },
      { text: "Berlin", correct: false }
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Python", correct: false },
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    answers: [
      { text: "Harper Lee", correct: true },
      { text: "Ernest Hemingway", correct: false },
      { text: "F. Scott Fitzgerald", correct: false },
      { text: "Mark Twain", correct: false }
    ]
  }
];

const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const question = questions[currentQuestionIndex];
  questionContainer.innerText = question.question;

  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(button, isCorrect) {
  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    const correct = btn.innerText === questions[currentQuestionIndex].answers.find(a => a.correct).text;
    btn.classList.add(correct ? "correct" : "wrong");
  });

  if (isCorrect) {
    button.classList.add("correct");
  } else {
    button.classList.add("wrong");
  }

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionContainer.innerText = "Quiz Completed!";
  const score = document.createElement("div");
  score.innerText = `You scored ${getScore()} out of ${questions.length}.`;
  answerButtons.appendChild(score);
  nextButton.innerText = "Restart";
  nextButton.style.display = "block";
  nextButton.onclick = startQuiz;
}

function getScore() {
  let score = 0;
  questions.forEach((q, i) => {
    const correctAnswer = q.answers.find(a => a.correct);
    if (document.querySelectorAll(".correct")[i * 4]?.innerText === correctAnswer.text) {
      score++;
    }
  });
  return score;
}

startQuiz();
