const sessionTime = localStorage.getItem('sessionTime');
localStorage.setItem('sessionTime', sessionTime);
window.onload = function () {
  if (chrome.storage) {
    chrome.storage.local.get(
      ['user', 'currentSession', 'sessionTime'],
      (results) => {
        if (results.user) {
          localStorage.clear();
          console.log('checking to see if something ran');
          localStorage.setItem('user', JSON.stringify(results.user));
          console.log(results.currentSession);
          localStorage.setItem(
            'currentSession',
            JSON.stringify(results.currentSession)
          );
          localStorage.setItem(
            'sessionTime',
            JSON.stringify(results.sessionTime)
          );
        }
      }
    );
  }
};
