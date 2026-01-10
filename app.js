import { FlashCard } from './flashcard-component.js';
import { Storage } from './storage.js';
import { fetchTranslation } from './api.js';

let currentUser = localStorage.getItem('currentUser');
if (!currentUser) window.location.href = 'login.html';

const welcome = document.getElementById('welcome');
const flashcardContainer = document.getElementById('flashcard-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const resetBtn = document.getElementById('reset-btn');
const translateBtn = document.getElementById('translate-btn');
const wordInput = document.getElementById('word');

welcome.textContent = `Welcome, ${currentUser}`;

let flashcards = Storage.loadUserData(currentUser);
let index = 0;

const renderCard = () => {
  flashcardContainer.innerHTML = '';
  if (!flashcards.length) return;
  const card = document.createElement('flash-card');
  card.data = flashcards[index];
  flashcardContainer.appendChild(card);
};

prevBtn.addEventListener('click', () => {
  if (!flashcards.length) return;
  index = (index - 1 + flashcards.length) % flashcards.length;
  renderCard();
});

nextBtn.addEventListener('click', () => {
  if (!flashcards.length) return;
  index = (index + 1) % flashcards.length;
  renderCard();
});

translateBtn.addEventListener('click', async () => {
  const word = wordInput.value.trim();
  if (!word) return alert('Type a word');
  const translation = await fetchTranslation(word);
  flashcards.push({ word, translation });
  Storage.saveUserData(currentUser, flashcards);
  index = flashcards.length - 1;
  renderCard();
  wordInput.value = '';
});

resetBtn.addEventListener('click', async () => {
  const randomWords = ['apple', 'book', 'house', 'sun', 'car', 'cat', 'dog', 'tree', 'water', 'school'];
  flashcards = [];
  for (let i = 0; i < 5; i++) {
    const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    const translation = await fetchTranslation(randomWord);
    flashcards.push({ word: randomWord, translation });
  }
  Storage.saveUserData(currentUser, flashcards);
  index = 0;
  renderCard();
  alert('Old flashcards removed and new ones loaded!');
});

// initial render
renderCard();
