import { Storage } from './storage.js';
import { fetchTranslation } from './api.js';
import { state } from './state.js';

export function initCards() {
  const container = document.getElementById('flashcard-container');
  if (!container) return;

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const resetBtn = document.getElementById('reset-btn');
  const translateBtn = document.getElementById('translate-btn');
  const wordInput = document.getElementById('word');

  let index = 0;
  let flashcards = state.cards;

  function renderCard() {
    container.innerHTML = '';
    if (!flashcards.length) return;

    const card = document.createElement('flash-card');
    card.data = flashcards[index];
    container.appendChild(card);
  }

  prevBtn?.addEventListener('click', () => {
    if (!flashcards.length) return;
    index = (index - 1 + flashcards.length) % flashcards.length;
    renderCard();
  });

  nextBtn?.addEventListener('click', () => {
    if (!flashcards.length) return;
    index = (index + 1) % flashcards.length;
    renderCard();
  });

  translateBtn?.addEventListener('click', async () => {
    const word = wordInput.value.trim().toLowerCase();
    if (!word) return alert('Wpisz słowo');

    const exists = flashcards.some(c => c.word === word);
    if (exists) return alert('To słowo już istnieje');

    const translation = await fetchTranslation(word);
    flashcards.push({ word, translation });

    Storage.saveUserData(state.user, flashcards);
    index = flashcards.length - 1;
    renderCard();
    wordInput.value = '';
  });

  const randomWords = [
    'apple','book','house','sun','car',
    'cat','dog','tree','water','school'
  ];

  function getRandomUnique(arr, count) {
    const copy = [...arr];
    const result = [];
    while (result.length < count && copy.length) {
      const i = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(i, 1)[0]);
    }
    return result;
  }

  resetBtn?.addEventListener('click', async () => {
    const words = getRandomUnique(randomWords, 5);
    flashcards = [];

    for (const w of words) {
      const t = await fetchTranslation(w);
      flashcards.push({ word: w, translation: t });
    }

    Storage.saveUserData(state.user, flashcards);
    index = 0;
    renderCard();
    alert('Załadowano nowe fiszki!');
  });

  renderCard();
}
