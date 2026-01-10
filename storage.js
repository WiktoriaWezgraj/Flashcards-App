export const Storage = {
  saveUserData: (username, flashcards) => {
    const all = JSON.parse(localStorage.getItem('flashcards_users')) || {};
    if (!all[username]) all[username] = { password: '', flashcards: [] };
    all[username].flashcards = flashcards;
    localStorage.setItem('flashcards_users', JSON.stringify(all));
  },

  loadUserData: (username) => {
    const all = JSON.parse(localStorage.getItem('flashcards_users')) || {};
    return all[username]?.flashcards || [];
  }
};
