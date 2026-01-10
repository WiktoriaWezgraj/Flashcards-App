export const Storage = {
  saveUserData: (username, flashcards, quizStats = null) => {
    const all = JSON.parse(localStorage.getItem('flashcards_users')) || {};
    if (!all[username]) all[username] = { password: '', flashcards: [], stats: {} };
  
    all[username].flashcards = flashcards;

  if (quizStats) {
    all[username].stats = quizStats;
  }

    localStorage.setItem('flashcards_users', JSON.stringify(all));
  },

  loadUserData: (username) => {
    const all = JSON.parse(localStorage.getItem('flashcards_users')) || {};
    return all[username]?.flashcards || [];
  },

  loadStats(username) {
    const all = JSON.parse(localStorage.getItem('flashcards_users')) || {};
    return all[username]?.stats || { correct: 0, wrong: 0, total: 0 };
  }
};
