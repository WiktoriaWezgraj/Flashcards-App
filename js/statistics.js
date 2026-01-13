import { Storage } from './storage.js';

export function initStats() {
  const statsText = document.getElementById('stats-text');
  const barCorrect = document.getElementById('bar-correct');
  const barWrong = document.getElementById('bar-wrong');
  const barTotal = document.getElementById('bar-total');
  const barPercentage = document.getElementById('bar-percentage');
  
  const user = localStorage.getItem('currentUser');
  if (!user || !statsText) return;

  const stats = Storage.loadStats(user);

  const correct = stats.correct;
  const wrong = stats.wrong;
  const total = stats.total;
  const percentage = stats.total === 0 ? 0 : Math.round((correct / total) * 100);

  statsText.textContent = `
    Poprawnie: ${correct}
    Niepoprawnie: ${wrong}
    Razem: ${total}
    Wynik procentowy: ${percentage}%
  `;

  if (total === 0) {
    barCorrect.style.height = '0%';
    barWrong.style.height = '0%';
    barTotal.style.height = '0%';
    barPercentage.style.height = '0%';
  } 
  else {
    barTotal.style.height = '100%'; 

    barCorrect.style.height = `${(correct / total) * 100}px`;
    barWrong.style.height = `${(wrong / total) * 100}px`;
    barPercentage.style.height = `${percentage}%`;
  }

    barCorrect.textContent = correct;
    barWrong.textContent = wrong;
    barTotal.textContent = total;
    barPercentage.textContent = `${percentage}%`;
}

initStats();


