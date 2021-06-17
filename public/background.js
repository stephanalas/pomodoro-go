'use strict';

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  console.log(tabId);
  const url = changeInfo.pendingUrl || changeInfo.url;

  if (!url || !url.startsWith('http')) {
    return;
  }

  const hostname = new URL(url).hostname;
  console.log('hostname:', hostname);
  chrome.storage.local.set({ userAttempt: hostname });

  chrome.storage.local.get(['blocked'], function (local) {
    const { blocked } = local;
    console.log('blocked:', blocked);
    if (
      Array.isArray(blocked) &&
      blocked.find((domain) => {
        console.log(domain);
        return domain.includes(hostname);
      })
    ) {
      // chrome.tabs.remove(tabId);
      chrome.tabs.update(tabId, { url: 'https://pomodoro-russ.herokuapp.com/uhoh' }); // hard-code it to production url atm instead of 'http://localhost:8080/uhoh'
    }
  });
});
