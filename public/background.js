'use strict';

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  chrome.storage.local.get(null, function (items) {
    var allEntries = Object.entries(items);
    console.log('allEntries:', allEntries);
  });

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
      chrome.tabs.update(tabId, { url: 'http://localhost:8080/uhoh' });
    }
  });
});

// increment blocks in Blacklist table
chrome.tabs.onUpdated.addListener(function async(tabId, changeInfo) {
  chrome.storage.local.get(['auth'], function (result) {
    console.log('result:', result);
    const url = changeInfo.pendingUrl || changeInfo.url;

    if (url) {
      const matchingSite = sites.find((site) => {
        return site.siteUrl === url;
      });
      if (matchingSite) {
        matchingSite.visits++;
        chrome.storage.local.set({ updatedSite: matchingSite });
      }
    }
  });
});

//Russel's test
chrome.tabs.onUpdated.addListener(function async(tabId, changeInfo) {
  chrome.storage.local.get(['sites'], function (result) {
    const sites = JSON.parse(result.sites);

    const url = changeInfo.pendingUrl || changeInfo.url;
    if (url) {
      const matchingSite = sites.find((site) => {
        return site.siteUrl === url;
      });
      if (matchingSite) {
        matchingSite.visits++;
        chrome.storage.local.set({ updatedSite: matchingSite });
      }
    }
  });
});
