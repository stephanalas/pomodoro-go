'use strict';
const { storage, tabs, runtime, alarms, scripting, identity } = chrome;

const background = {
  alarmCreated: false,
  async getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  },
  init() {
    this.listenForAlarm();
    this.listenToMessages();
    this.listenToStorage();
    this.listenToTabs();
    this.listenForBlackListIncrement();
    this.listenForDashboardRedirect();
  },
  createAlarm(ms) {},
  resetStorage() {
    storage.local.set({
      sessionTime: 0,
      timerOn: false,
      currentSession: {},
      alarmCreated: false,
      sessionComplete: false,
      user: {},
      email: '',
    });
  },

  listenToMessages() {
    return runtime.onMessage.addListener(
      async (message, sender, sendResponse) => {
        try {
          // CLEARS STORAGE AND ALARMS WHEN EXTENSION TAB STARTS (RUNS ONCE
          if (message === 'app-starting') {
            // SENDS RESPONSE TO CHROME CONSOLE
            sendResponse('clearing alarms and storage');
            // CLEAR STORAGE
            await storage.local.clear();
            // CLEAR ALARMS
            await alarms.clearAll();
            // SETTING DATA IN STORAGE SYNC
            this.resetStorage();
          }
          if (message === 'startTimer') {
            storage.local.get(['sessionTime'], (results) => {
              chrome.alarms.create('timer', {
                when: Date.now() + results.sessionTime,
              });
              this.alarmCreated = true;
              const { alarmCreated } = this;
              chrome.storage.local.set({ alarmCreated });
            });
          }
          return true;
        } catch (error) {
          console.log(error);
        }
      }
    );
  },
  listenToStorage() {
    return storage.onChanged.addListener(async function (changes, namespace) {
      if (changes.user) {
        // IF THE A USER LOGINS IN AND SET IN STORAGE LOG MESSAGE
        if (!changes.user.oldValue && changes.user.newValue) {
          console.log('user is set in storage');
        }
      }

      // creates a new alarm
      // try {
      //   // IF THE NEW VALUE OF A CURRENT SESSION HAS A START TIME, CREATE AN ALARM AND KEEP TRACK OF CREATION IN BACKGROUND OBJECT
      //   if (
      //     changes.currentSession &&
      //     changes.currentSession.newValue.startTime
      //   ) {
      //   }
      // } catch (error) {
      //   console.log('alarm not created');
      // }

      // logging out the changes in storage
      // THIS CODE IS FOR DEV PURPOSES
      // YOU WILL HAVE ALOT OF LOGS IN CONSOLE
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
          `Storage key "${key}" in namespace "${namespace}" changed.`,
          `Old value was "${JSON.stringify(
            oldValue
          )}", new value is "${JSON.stringify(newValue)}".`
        );
      }
    });
  },
  listenToTabs() {
    return tabs.onUpdated.addListener(function (tabId, changeInfo) {
      const url = changeInfo.pendingUrl || changeInfo.url;
      if (!url || !url.startsWith('http')) {
        return;
      }
      const hostname = new URL(url).hostname;
      console.log('hostname:', hostname);
      if (hostname === 'localhost' || !hostname) {
        scripting.executeScript(
          {
            target: { tabId },
            files: ['./localStorage.js'],
          },
          () => {
            console.log('executing load script');
          }
        );
      }
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
  },
  listenForBlackListIncrement() {
    // increment blocks in Blacklist table when a blacklisted site is blocked

    return chrome.tabs.onUpdated.addListener(function async(tabId, changeInfo) {
      chrome.storage.local.get(['auth', 'blackList'], function (result) {
        const { auth, blackList } = result;
        if (blackList) {
          const blackListAuth = blackList.filter((entry) => {
            return entry.userId === auth.id;
          });
          const url = changeInfo.pendingUrl || changeInfo.url;
          if (url) {
            const matchingBlackList = blackListAuth.find((entry) => {
              return entry.site.siteUrl === url;
            });

            if (matchingBlackList) {
              matchingBlackList.blocks++;
              console.log('matchingBlackList:', matchingBlackList);
              chrome.storage.local.set({ updatedBlackList: matchingBlackList });
            }
          }
        }
      });
    });
  },
  listenForAlarm() {
    return chrome.alarms.onAlarm.addListener(function (alarm) {
      // notifies the user when the session is over
      chrome.notifications.create(
        undefined,
        {
          type: 'basic',
          title: 'Pomodoro-Go',
          message: 'Time has elasped, head back to Pomorodo-Go to review',
          iconUrl: 'https://img.icons8.com/android/24/000000/timer.png',
          buttons: [{ title: 'Go to dashboard' }],
        },
        () => {
          console.log('last error: ', chrome.runtime.lastError);
        }
      );
      chrome.storage.local.set({
        alarmCreated: false,
        currentSession: {},
        timerOn: false,
        sessionTime: 0,
        sessionComplete: true,
      });
    });
  },
  listenForDashboardRedirect() {
    // THIS BUTTON WORKS BUT DASHBOARD DOES NOT LOAD
    return chrome.notifications.onButtonClicked.addListener(
      async (notificationId, buttonIdx) => {
        // redirects to dashboard after session is complete
        let tab = await this.getCurrentTab();
        chrome.tabs.update(tab.id, { url: 'http://localhost:8080/dashboard' });
      }
    );
  },
};

background.init();
