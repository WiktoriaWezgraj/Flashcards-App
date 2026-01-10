import { Storage } from './storage.js';
import { state } from './state.js';
import { Auth } from './auth.js';
import { initCards } from './cards.js';
import { initQuiz } from './quiz.js';
import { initStats } from './statistics.js';

state.user = Auth.getCurrentUser();
if (!state.user) window.location.href = 'login.html';

state.cards = Storage.loadUserData(state.user);
state.quiz = Storage.loadStats(state.user);

initCards();
initQuiz();
initStats();
