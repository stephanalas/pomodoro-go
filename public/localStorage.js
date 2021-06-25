// window.onload = () => {
//   const sessionTime = localStorage.getItem('sessionTime');
//   console.log('typeof sessionTime', typeof sessionTime);
//   if (sessionTime >= 0 && sessionTime !== 'null') {
//     chrome.storage.sync.set({ sessionTime: sessionTime });
//     chrome.storage.sync.get(['sessionTime'], (results) => {
//       if (results.sessionTime) {
//         chrome.runtime.sendMessage('startTimer', () => {
//           console.log('timer has been created');
//         });
//       }
//     });
//   }
// };

window.onload = () => {
  console.log('window just loaded');
  const currentSessionTime = window.localStorage.getItem('sessionTime');
  if (parseInt(currentSessionTime)) {
    // chrome.runtime.sendMessage({
    //   message: 'continue-alarm',
    //   sessionTime: parseInt(currentSessionTime),
    // });
    // window.timer = setInterval(() => {
    //   const newSessionTime = parseInt(localStorage.getItem('sessionTime'));
    //   if (!newSessionTime) {
    //     console.log('timer reached zero yayyyyy!!!');
    //     clearInterval();
    //   } else {
    //     localStorage.setItem('sessionTime', newSessionTime - 1000);
    //   }
    // }, 1000);
  } else {
    clearInterval(window.timer);
  }
};
window.onbeforeunload = () => {
  const currentSessionTime = window.localStorage.getItem('sessionTime');
  const timerDone = window.localStorage.getItem('timerDone');
  if (!timerDone && parseInt(currentSessionTime)) {
    clearInterval(window.timer);
    chrome.runtime.sendExternalMessage('jgphbioennmnjogfbpchcgphelmfoiig', {
      message: 'create-alarm',
      sessionTime: parseInt(currentSessionTime),
    });
  }
};
