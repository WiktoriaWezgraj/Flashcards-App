import { Storage } from './storage.js';

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

const USERS_KEY = 'flashcards_users';

const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || {};
const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

loginBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  if (!username || !password) return alert('Wprowadź dane we wszystkie pola');

  const users = getUsers();
  if (users[username] && users[username].password === password) {
    localStorage.setItem('currentUser', username);
    window.location.href = 'index.html';
  } else {
    alert('Niepoprawny login');
  }
});

registerBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  if (!username || !password) return alert('Wprowadź dane we wszystkie pola');

  const users = getUsers();
  if (users[username]) return alert('Użytkownik już istnieje');

  users[username] = { password, flashcards: [] };
  saveUsers(users);
  alert('Zarejestrowano użytkownika. Możesz się zalogować.');
});
