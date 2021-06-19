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
        sessionComplete: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

storage.onChanged.addListener(async function (changes, namespace) {
  let state = {};
  chrome.storage.sync.get(null, (results) => {
    for (const i in results) {
      state[i] = results[i];
    }
  });
  try {
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
  } catch (error) {
    console.log('alarm not created');
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
    console.log('blocked:', blocked);
    if (
      Array.isArray(blocked) &&
      blocked.find((domain) => {
        console.log(domain);
        return domain.includes(hostname);
      })
    ) {
      // chrome.tabs.remove(tabId);
      chrome.tabs.update(tabId, {
        url: 'https://pomodoro-russ.herokuapp.com/uhoh',
      }); // hard-code it to production url atm instead of 'http://localhost:8080/uhoh'
    }
  });
});

chrome.alarms.onAlarm.addListener(function (alarm) {
  chrome.notifications.create(undefined, {
    type: 'basic',
    title: 'Pomodoro-Go',
    message: 'Time has elasped, head back to Pomorodo-Go to review',
    iconUrl: 'https://img.icons8.com/android/24/000000/timer.png',
    buttons: [{ title: 'Go to dashboard' }],
  });
  chrome.storage.sync.set({
    alarmCreated: false,
    currentSession: null,
    timerOn: false,
    sessionTime: 0,
    sessionComplete: true,
  });
});

chrome.notifications.onButtonClicked.addListener(
  async (notificationId, buttonIdx) => {
    let tab = await getCurrentTab();
    chrome.tabs.update(tab.id, { url: 'http://localhost:8080/dashboard' });
  }
);
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
