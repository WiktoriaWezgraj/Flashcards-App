import { Storage } from './storage.js';
import { state } from './state.js';
import { Auth } from './auth.js';
import { initCards } from './cards.js';
import { initQuiz } from './quiz.js';
import { initTheme } from './theme.js';

state.user = Auth.getCurrentUser();
if (!state.user) window.location.href = 'login.html';

state.cards = Storage.loadUserData(state.user);

initTheme();
initCards();
initQuiz();
initStats();
