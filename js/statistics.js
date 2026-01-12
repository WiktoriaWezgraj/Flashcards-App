import { Storage } from './storage.js';

export function initStats() {
  const statsText = document.getElementById('stats-text');
  const resetBtn = document.getElementById('reset-stats-btn');
  const user = localStorage.getItem('currentUser');

  if (!user || !statsText) return;

  function render() {
    const stats = Storage.loadStats(user);

    const percent =
      stats.total === 0
        ? 0
        : Math.round((stats.correct / stats.total) * 100);

    statsText.textContent = `
Statystyki globalne:

Suma odpowiedzi: ${stats.total}
Poprawne: ${stats.correct}
Błędne: ${stats.wrong}
Skuteczność: ${percent}%
    `;
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Czy na pewno chcesz wyzerować statystyki?')) {
        Storage.saveUserData(user, null, {
          correct: 0,
          wrong: 0,
          total: 0
        });
        render();
      }
    });
  }

  render();
}

initStats();
