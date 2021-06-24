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

window.onload = async () => {
  const sessionTime = localStorage.getItem('sessionTime');
  console.log('windowONload sessiontime,', sessionTime);
  if (sessionTime >= 0 && sessionTime) {
    chrome.storage.sync.set({ sessionTime: Number(sessionTime) });
    chrome.storage.sync.get(['sessionTime'], (results) => {
      console.log('grabbed sessionTime from chromeStorage', results);
    });
  }
  cons;
};
