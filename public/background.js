'use strict';

const { storage, tabs } = chrome;

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  try {
    if (message === 'app-starting') {
      sendResponse('clearing alarms and storage');
      await chrome.storage.sync.clear();
      await chrome.alarms.clearAll();
      chrome.storage.sync.set({
        sessionTime: 0,
        timerOn: false,
        currentSession: null,
        alarmCreated: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

storage.onChanged.addListener(async function (changes, namespace) {
  try {
    let state = {};
    chrome.storage.sync.get(null, (results) => {
      for (const i in results) {
        state[i] = results[i];
      }
    });

    if (
      changes.currentSession &&
      changes.currentSession.newValue.startTime &&
      !state.alarmCreated
    ) {
      chrome.alarms.create('timer', {
        when: Date.now() + changes.currentSession.newValue.sessionTime,
      });
      chrome.storage.sync.set({ alarmCreated: true });
    }

    // logging out the changes in storage

    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${JSON.stringify(
          oldValue
        )}", new value is "${JSON.stringify(newValue)}".`
      );
    }
  } catch (error) {
    console.log(error);
  }
});

tabs.onUpdated.addListener(function (tabId, changeInfo) {
  const url = changeInfo.pendingUrl || changeInfo.url;

  if (!url || !url.startsWith('http')) {
    return;
  }
  const hostname = new URL(url).hostname;
  console.log('hostname:', hostname);

  storage.local.set({ userAttempt: hostname });

  storage.local.get(['blocked'], function (local) {
    const { blocked } = local;
    if (
      Array.isArray(blocked) &&
      blocked.find((domain) => {
        console.log(domain);
        return domain.includes(hostname);
      })
    ) {
      tabs.update(tabId, { url: 'http://localhost:8080/uhoh' });
    }
  });
});

chrome.alarms.onAlarm.addListener(function (alarm) {
  console.log('got an alarm!', alarm);
});
