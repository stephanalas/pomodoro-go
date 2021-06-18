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
      chrome.tabs.update(tabId, { url: 'http://localhost:8080/uhoh' });
    }
  });
});

// increment blocks in Blacklist table
chrome.tabs.onUpdated.addListener(function async(tabId, changeInfo) {
  chrome.storage.local.get(['auth', 'blackList'], function (result) {
    const { auth, blackList } = result;
    const blackListAuth = blackList.filter((entry) => {
      return entry.userId === auth.id;
    });
    console.log('blackListAuth:', blackListAuth);
    const url = changeInfo.pendingUrl || changeInfo.url;
    if (url) {
      const matchingBlackList = blackListAuth.find((entry) => {
        return entry.site.siteUrl === url;
      });

      if (matchingBlackList) {
        matchingBlackList.blocks++;
        console.log('matchingBlackList after increment', matchingBlackList);
        chrome.storage.local.set({ updatedBlackList: matchingBlackList });
      }
    }
  });
});

//Russel's test
// chrome.tabs.onUpdated.addListener(function async(tabId, changeInfo) {
//   chrome.storage.local.get(['sites'], function (result) {
//     const sites = JSON.parse(result.sites);

//     const url = changeInfo.pendingUrl || changeInfo.url;
//     if (url) {
//       const matchingSite = sites.find((site) => {
//         return site.siteUrl === url;
//       });
//       if (matchingSite) {
//         matchingSite.visits++;
//         chrome.storage.local.set({ updatedSite: matchingSite });
//       }
//     }
//   });
// });
