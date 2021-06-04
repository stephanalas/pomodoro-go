'use strict';

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  console.log(tabId);
  const url = changeInfo.pendingUrl || changeInfo.url;
  if (!url || !url.startsWith('http')) {
    return;
  }

  const hostname = new URL(url).hostname;
<<<<<<< Updated upstream
  console.log('hostname:', hostname)
=======
  console.log('hostname:', hostname);
>>>>>>> Stashed changes
  chrome.storage.local.set({ userAttempt: hostname });

  chrome.storage.local.get(['blocked'], function (local) {
    const { blocked } = local;
<<<<<<< Updated upstream
    if (Array.isArray(blocked) && blocked.find((domain) => {
      console.log(domain)
      return domain.includes(hostname)
    })) {
      // chrome.tabs.remove(tabId);
      chrome.tabs.update(tabId, {url: 'http://localhost:8080/uhoh'})
=======
    if (
      Array.isArray(blocked) &&
      blocked.find((domain) => {
        console.log(domain);
        return domain.includes(hostname);
      })
    ) {
      // chrome.tabs.remove(tabId);
      chrome.tabs.update(tabId, { url: 'http://localhost:8080/uhoh' });
>>>>>>> Stashed changes
    }
  });
});
