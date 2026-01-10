import { Storage } from './storage.js';
import { state } from './state.js';

export function initQuiz() {
  const quizWord = document.getElementById('quiz-word');
  if (!quizWord) return;

  

const quizAnswer = document.getElementById('quiz-answer');
const quizResult = document.getElementById('quiz-result');
const checkBtn = document.getElementById('check-btn')

let currentQuizCard = null;


const drawQuiz = () => {
  if (!state.cards.length) return;
  currentQuizCard =
    state.cards[Math.floor(Math.random() * state.cards.length)];

  quizWord.textContent = `Translate: ${currentQuizCard.word}`;
  quizAnswer.value = '';
  quizResult.textContent = '';
};

  
checkBtn.addEventListener('click', () => {
  const answer = quizAnswer.value.trim().toLowerCase();
  if (!answer) return;

  state.quiz.total++;

  if (answer === currentQuizCard.translation.toLowerCase()) {
    state.quiz.correct++;
    quizResult.textContent = 'Correct';
    quizResult.style.color = 'green';
  } else {
    state.quiz.wrong++;
    quizResult.textContent =
      `Incorrect. \n Correct answer: ${currentQuizCard.translation}`;
    quizResult.style.color = 'red';
  }

  
    Storage.saveUserData(state.user, state.cards, state.quiz);
    drawQuiz();
});

drawQuiz();
}
