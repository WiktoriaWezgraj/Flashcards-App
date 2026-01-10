import { state } from './state.js';

export function initStats() {
  const statsText = document.getElementById('stats-text');
  if (!statsText) return;


  const percent =
    state.quiz.total === 0
      ? 0
      : Math.round((state.quiz.correct / state.quiz.total) * 100);

  statsText.textContent = `
    Answers: ${state.quiz.total}
    Correct: ${state.quiz.correct}
    Incorrect: ${state.quiz.wrong}
    Percentage: ${percent}%
  `;

}
