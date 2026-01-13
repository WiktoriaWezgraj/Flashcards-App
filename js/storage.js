export const Storage = {
  saveUserData(username, flashcards = null, quizStats = null) {
    const all = JSON.parse(localStorage.getItem('flashcards_users')) || {};

    if (!all[username]) {
      all[username] = { password: '', flashcards: [], stats: { correct: 0, wrong: 0, total: 0 } };
    }

    if (flashcards !== null) {
      all[username].flashcards = flashcards;
    }

    if (quizStats !== null) {
      all[username].stats = quizStats;
    }

    localStorage.setItem('flashcards_users', JSON.stringify(all));
  },

  loadUserData(username) {
    const all = JSON.parse(localStorage.getItem('flashcards_users')) || {};
    return all[username]?.flashcards || [];
  },

  loadStats(username) {
    const all = JSON.parse(localStorage.getItem('flashcards_users')) || {};
    return all[username]?.stats || { correct: 0, wrong: 0, total: 0 };
  }
};
