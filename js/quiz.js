import { Storage } from './storage.js';
import { state } from './state.js';

export function initQuiz() {
  const quizWord = document.getElementById('quiz-word');
  const quizAnswer = document.getElementById('quiz-answer');
  const quizResult = document.getElementById('quiz-result');
  const checkBtn = document.getElementById('check-btn');
  const statsBtn = document.getElementById('stats-btn');
  if (!quizWord || !checkBtn) return;

  const TOTAL_QUESTIONS = 10;
  let currentIndex = 0;
  let currentQuizCard = null;

  let sessionStats = { correct: 0, wrong: 0, total: 0 };

  let quizCards = [...state.cards];
  shuffleArray(quizCards);

  function updateSessionStats(isCorrect) {
  const stats =
    JSON.parse(localStorage.getItem('sessionStats')) || {
      correct: 0,
      wrong: 0,
      total: 0
    };

  stats.total++;

  if (isCorrect) stats.correct++;
  else stats.wrong++;

  localStorage.setItem('sessionStats', JSON.stringify(stats));
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function drawQuiz() {
    if (
      currentIndex >= TOTAL_QUESTIONS ||
      currentIndex >= quizCards.length
    ) {
      showEndScreen();
      return;
    }

    currentQuizCard = quizCards[currentIndex];
    quizWord.textContent =
      `Pytanie ${currentIndex + 1}/${Math.min(TOTAL_QUESTIONS, quizCards.length)}: ` +
      `Przetłumacz: ${currentQuizCard.word}`;

    quizAnswer.value = '';
    quizResult.textContent = '';
  }

  function showEndScreen() {
  const percent =
    sessionStats.total === 0
      ? 0
      : Math.round((sessionStats.correct / sessionStats.total) * 100);

  quizWord.textContent = 'Koniec quizu :)';
  quizAnswer.disabled = true;
  checkBtn.disabled = true;

  quizResult.className = 'quiz-end-result';
  quizResult.textContent = `
Wynik tego quizu:
Poprawne: ${sessionStats.correct}
Błędne: ${sessionStats.wrong}
Wynik procentowy: ${percent}%
  `;

 const user = localStorage.getItem('currentUser');
  if (!user) return;

  const previous = Storage.loadStats(user);

  const updateStats = {
    correct: previous.correct + sessionStats.correct,
    wrong: previous.wrong + sessionStats.wrong,
    total: previous.total + sessionStats.total
    };

    Storage.saveUserData(user, null, updateStats);

    if (statsBtn) {
    statsBtn.style.display = 'inline-block';
  };
}

  statsBtn?.addEventListener('click', () => {
    window.location.href = 'statistics.html';
  });

  checkBtn.addEventListener('click', () => {
    if (!currentQuizCard) return;

    const answer = quizAnswer.value.trim().toLowerCase();
    if (!answer) return;

    sessionStats.total++;

    if (answer === currentQuizCard.translation.toLowerCase()) {
      sessionStats.correct++;

      quizResult.textContent = 'Poprawnie!';
      quizResult.style.color = 'green';
    } else {
      sessionStats.wrong++;

      quizResult.textContent =
        `Źle! Poprawna odpowiedź: ${currentQuizCard.translation}`;
      quizResult.style.color = 'red';
    }

    currentIndex++;
    setTimeout(drawQuiz, 600);
  });

  drawQuiz();
}
