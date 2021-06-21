window.onload = () => {
  const loginButton = document.querySelector('.login');
  const logoutButton = document.querySelector('.logout');
  if (loginButton) {
    loginButton.addEventListener('click', () => {
      const {
        storage: { sync },
        identity: { getAuthToken, getProfileUserInfo },
      } = chrome;
      getAuthToken({ interactive: true }, (token) => {
        sync.set({ authToken: token });
      });
      getProfileUserInfo({ accountStatus: 'ANY' }, (userInfo) => {
        sync.set(userInfo);
      });

      chrome.runtime.sendMessage('login', (response) => {
        console.log('after log in', response);
      });
    });
  } else {
    logoutButton.addEventListener('click', () => {
      sync.set({ user: null, authToken: '', currentSession: {} });
      chrome.identity.clearAllCachedAuthTokes(() => {
        console.log('tokens cleared');
      });
    });
  }
};
