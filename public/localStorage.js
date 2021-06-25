// window.onbeforeunload = () => {
//   const currentSessionTime = window.localStorage.getItem('sessionTime');
//   const sessionIsSet = window.localStorage.getItem('sessionIsSet');
//   const timerDone = window.localStorage.getItem('timerDone');
//   if (
//     timerDone === 'false' &&
//     parseInt(currentSessionTime) &&
//     sessionIsSet === 'true'
//   ) {
//     clearInterval(window.timer);
//     // chrome.runtime.sendExternalMessage('jgphbioennmnjogfbpchcgphelmfoiig', {
//     //   message: 'create-alarm',
//     //   sessionTime: parseInt(currentSessionTime),
//     // });
//   }
//   if (timerDone === 'true') {
//     clearInterval(window.timer);
//     localStorage.removeItem('timerDone');
//   }
// };
