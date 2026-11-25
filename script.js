const questions = [
  {
    question: "¿Cuál es mi color favorito?",
    options: ["Negro", "Rojo", "Morado"],
    answer: "Negro",
    correctMessage: "¡Ish, correctoooo! 🖤",
    wrongMessage: "Esperaba más de ti..."
  },
  {
    question: "¿Cuál es mi comida favorita?",
    options: ["Pizza", "Pasta", "Hamburguesa"],
    answer: "Pasta",
    correctMessage: "Es... ¡correctoooo, bb! 🍝",
    wrongMessage: "Trátame seria, la pasta es LA PASTA."
  },
  {
    question: "¿Cuándo cumplo años?",
    options: ["29 de febrero", "17 de octubre", "28 de febrero"],
    answer: "28 de febrero",
    correctMessage: "¡Fantástico! 🎂",
    wrongMessage: "Uy noooo, qué tristeza."
  },
  {
    question: "¿Cuál es mi música favorita?",
    options: ["Rock", "Punk", "Popular"],
    answer: "Punk",
    correctMessage: "¡Sí, esa eeeeees! 🎸",
    wrongMessage: "Incorrecta..."
  },
  {
    question: "¿Mi época favorita del año?",
    options: ["Navidad", "Halloween", "Verano"],
    answer: "Navidad",
    correctMessage: "Obviooo: Adonay, ¿por qué te casaste, Adonay? 🎄",
    wrongMessage: "Nooo, qué tristeza."
  },
  {
    question: "¿Cuál es mi anime favorito?",
    options: ["Nana", "One Piece", "Death Note"],
    answer: "Nana",
    correctMessage: "Nana... si tú y yo hubiéramos sido novias, ¿crees que un abrazo hubiera bastado para solucionarlo todo? 🥹",
    wrongMessage: "¡Estaba súper fácil! :C"
  },
  {
    question: "¿Cuál es la comida que más odio?",
    options: ["Pescado", "Brócoli", "Sopa"],
    answer: "Pescado",
    correctMessage: "¡Es correctooooo!",
    wrongMessage: "Ni hablemoos."
  },
  {
    question: "¿Cuál me gusta más?",
    options: ["La pizza", "La hamburguesa", "El sushi"],
    answer: "La hamburguesa",
    correctMessage: "¡Me encantan las hamburguesaaaaas! 🍔",
    wrongMessage: "¡Es la hamburguesaaaa!"
  },
  {
    question: "¿Cómo me llamo en Roblox?",
    options: ["Sohory", "Mayra", "Lorena"],
    answer: "Sohory",
    correctMessage: "¡Sip, soy Sohoryi!",
    wrongMessage: "Ya ni hablemos..."
  },
  {
    question: "¿Cuánto tengo de miopía?",
    options: ["100", "150", "300 y astigmatismo"],
    answer: "300 y astigmatismo",
    correctMessage: "AJAJJAJAJAJ ¡SÍ! 🤓",
    wrongMessage: "Era la 3, lastimosamente."
  }
];

const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const nameInput = document.getElementById("nombre");
const durationInput = document.getElementById("cuanto");
const introError = document.getElementById("introError");
const questionText = document.getElementById("questionText");
const answerArea = document.getElementById("answerArea");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const scoreText = document.getElementById("scoreText");

let playerName = "";
let relationshipDuration = "";
let currentQuestion = 0;
let correct = 0;
let incorrect = 0;
let answered = false;

document.getElementById("startBtn").addEventListener("click", () => {
  playerName = nameInput.value.trim();
  relationshipDuration = durationInput.value.trim();

  if (!playerName || !relationshipDuration) {
    introError.textContent = "Completa tu nombre y hace cuánto se conocen para continuar.";
    return;
  }

  intro.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
});

function showQuestion() {
  const item = questions[currentQuestion];
  answered = false;
  questionText.textContent = item.question;
  answerArea.replaceChildren();
  feedback.textContent = "";
  feedback.className = "feedback";
  nextBtn.textContent = "Comprobar respuesta";
  nextBtn.disabled = false;

  item.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = "answer";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = option;
    radio.required = true;

    const span = document.createElement("span");
    span.textContent = `${index + 1}. ${option}`;

    label.append(radio, span);
    answerArea.append(label);
  });

  progressText.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
  scoreText.textContent = `${correct} correctas`;
  progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
}

document.getElementById("quizForm").addEventListener("submit", (event) => {
  event.preventDefault();

  if (!answered) {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
      feedback.textContent = "Elige una respuesta antes de continuar.";
      feedback.className = "feedback wrong";
      return;
    }

    const item = questions[currentQuestion];
    const isCorrect = selected.value === item.answer;

    if (isCorrect) {
      correct++;
      feedback.textContent = item.correctMessage;
      feedback.className = "feedback correct";
    } else {
      incorrect++;
      feedback.textContent = item.wrongMessage;
      feedback.className = "feedback wrong";
    }

    document.querySelectorAll('input[name="answer"]').forEach(input => {
      input.disabled = true;
    });

    answered = true;
    nextBtn.textContent = currentQuestion === questions.length - 1 ? "Ver resultado" : "Siguiente pregunta";
    scoreText.textContent = `${correct} correctas`;
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    return;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  document.getElementById("resultTitle").textContent = `¡Terminaste, ${playerName}!`;
  document.getElementById("resultMessage").textContent =
    `Se conocen desde: ${relationshipDuration}.`;
  document.getElementById("finalScore").textContent = `${correct}/10`;
  document.getElementById("finalBreakdown").textContent =
    `Tu puntaje final fue de ${correct} respuestas correctas y ${incorrect} incorrectas.`;
}

document.getElementById("restartBtn").addEventListener("click", () => {
  currentQuestion = 0;
  correct = 0;
  incorrect = 0;
  playerName = "";
  relationshipDuration = "";
  nameInput.value = "";
  durationInput.value = "";
  result.classList.add("hidden");
  intro.classList.remove("hidden");
  introError.textContent = "";
  progressBar.style.width = "0%";
});
