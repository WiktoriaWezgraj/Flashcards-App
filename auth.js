export const Auth = {
  login: (username) => {
    if (!username) return null;
    localStorage.setItem('currentUser', username);
    return username;
  },

  getCurrentUser: () => localStorage.getItem('currentUser')
};
