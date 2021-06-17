'use strict';

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  console.log(tabId);
  console.log(changeInfo);
  const url = changeInfo.pendingUrl || changeInfo.url;
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let url = tabs[0].url;
    console.log(url);
    if (url === 'chrome://newtab/') {
      chrome.tabs.update(tabId, { url: 'http://localhost:8080/' });
    }
  });

  if (!url || !url.startsWith('http')) {
    console.log('no url');
    // chrome.tabs.update(tabId, { url: 'http://localhost:8080/' });
    return;
  }
  const hostname = new URL(url).hostname;
  console.log('hostname:', hostname);
  chrome.storage.local.set({ userAttempt: hostname });

  chrome.storage.local.get(['blocked'], function (local) {
    const { blocked } = local;
    if (
      Array.isArray(blocked) &&
      blocked.find((domain) => {
        console.log(domain);
        return domain.includes(hostname);
      })
    ) {
      // chrome.tabs.remove(tabId);
      chrome.tabs.update(tabId, { url: 'http://localhost:8080/uhoh' });
    }
  });
});
