'use strict';
const { storage, tabs, runtime, alarms, scripting } = chrome;

const background = {
  active: false,
  currentTab: null,
  sessionTime: 0,
  appStarted: false,
  getCurrentTab: async function () {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  },
  init: async function () {
    try {
      if (!this.active) {
        console.log('running app!');
        storage.sync.clear();
        alarms.clearAll(() => {
          console.log('alarms are cleared');
        });

        this.listenForAlarm();
        this.listenToExternalMessages();
        this.listenToStorage();
        this.listenToTabs();
        this.listenForBlackListIncrement();
        this.listenForDashboardRedirect();
        this.active = true;
      }
      this.currentTab = await this.getCurrentTab();
      // scripting.executeScript(
      //   {
      //     target: { tabId: this.currentTab.id },
      //     files: ['localStorage.js'],
      //   },
      //   () => {
      //     console.log('trying to grabb data from our website');
      //   }
      // );
    } catch (error) {
      console.log('issue with start up in background js', error);
    }
  },
  createAlarm: function () {
    chrome.alarms.create('timer', {
      when: Date.now() + this.sessionTime,
    });
    this.alarmCreated = true;
    chrome.storage.sync.set({ alarmCreated: true });
    console.log('alarm creeated!!!');
  },
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

  listenToExternalMessages: function () {
    return runtime.onMessageExternal.addListener(
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

            // MUST RETURN TRUE  TO KEEP MESSAGE PORT OPEN
            return true;
          }

          if (message.message === 'create-timer') {
            this.sessionTime = message.sessionTime;
            this.createAlarm();
          }
          if (message.message === 'continue-alarm') {
            console.log('you want me to start an alarm?');
            alarms.clearAll(() => {
              console.log('alarms are cleared again');
              alarms.create('timer', {
                when: Date.now() + message.sessionTime,
              });
              console.log('new alarm created');
            });
          }
          if (message.message === 'timer-done') {
            console.log('received message');
            alarms.create('timer', { when: Date.now() });
          }
          if (message.message === 'set-blocked-sites') {
            const sites = [];
            message.blockedSites.forEach((site) => {
              sites.push(site.siteUrl);
            });
            chrome.storage.sync.set({ blocked: sites }, () => {
              console.log('sites are blocked in chrome');
            });
            console.log('blocked sites', message);
            chrome.storage.sync.get(null, (results) => {
              console.log('current chrome storage', results);
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  },
  listenToStorage: function () {
    return storage.onChanged.addListener(async function (changes, namespace) {
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
  listenToTabs: function () {
    return tabs.onUpdated.addListener(function (tabId, changeInfo) {
      console.log('listening to tabs');
      chrome.tabs.query({ active: false }, (tabs) => {
        let tab = tabs.reduce((previous, current) => {
          return previous.lastAccessed > current.lastAccessed
            ? previous
            : current;
        });
      });
      chrome.storage.sync.get(null, (results) => {
        const {
          currentSession,
          alarmCreated,
          sessionComplete,
          sessionTime,
          timerOn,
        } = results;
        const url = changeInfo.pendingUrl || changeInfo.url;
        if (changeInfo.pendingUrl || changeInfo.url) {
          if (!url || !url.startsWith('http')) {
            console.log('we are on the chrome extension');
            return;
          }
          if (url.startsWith(process.env.API_URL)) {
            console.log('we are on the website');
          }
          if (url && !url.startsWith(procces.env.API_URL)) {
            console.log('we are not on the website');
          }
        }
        const hostname = new URL(url).hostname;
        // console.log('hostname:', hostname);
        // transfer storage

        storage.sync.set({ userAttempt: hostname });

        storage.sync.get(['blocked'], function (sync) {
          const { blocked } = sync;
          // console.log('blocked:', blocked);
          if (
            Array.isArray(blocked) &&
            blocked.find((domain) => {
              // console.log(domain);
              return domain.includes(hostname);
            })
          ) {
            // chrome.tabs.remove(tabId);
            chrome.tabs.update(tabId, {
              // url: 'https://pomodoro-russ.herokuapp.com/uhoh',
              url: 'http://localhost:8080/uhoh',
            }); // hard-code it to production url atm instead of 'http://localhost:8080/uhoh'
          }
        });
      });
    });
  },
  listenForBlackListIncrement: function () {
    // increment blocks in Blacklist table when a blacklisted site is blocked

    return chrome.tabs.onUpdated.addListener(function async(tabId, changeInfo) {
      chrome.storage.sync.get(['auth', 'blackList'], function (result) {
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
              chrome.storage.sync.set({ updatedBlackList: matchingBlackList });
            }
          }
        }
      });
    });
  },
  listenForAlarm: function () {
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
  listenForDashboardRedirect: function () {
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
