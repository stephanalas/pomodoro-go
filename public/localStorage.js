window.onload = () => {
  console.log('running from localStorage');
  console.log('sessionTime', localStorage.getItem('sessionTime'));
  const sessionTime = localStorage.getItem('sessionTime');
  console.log('typeof sessionTime', typeof sessionTime);
  if (sessionTime >= 0 && sessionTime !== 'null') {
    console.log('sessionTime is greater than 0');
    chrome.storage.sync.set({ sessionTime: sessionTime });
    chrome.storage.sync.get(['sessionTime'], (results) => {
      console.log('chrome SessionTime', results);
      if (results.sessionTime) {
        chrome.runtime.sendMessage('startTimer', () => {
          console.log('timer has been created');
        });
      }
    });
  }
};

window.onbeforeunload = () => {
  console.log('leaving the website');
  const sessionTime = localStorage.getItem('sessionTime');
  console.log('typeof sessionTime', typeof sessionTime);
  if (sessionTime >= 0 && sessionTime) {
    console.log('sessionTime is greater than 0');
    chrome.storage.sync.set({ sessionTime: sessionTime });
    chrome.storage.sync.get(['sessionTime'], (results) => {
      console.log('chrome SessionTime', results);
      if (results.sessionTime) {
        chrome.runtime.sendMessage('startTimer', () => {
          console.log('timer has been created');
        });
      }
    });
  }
};
