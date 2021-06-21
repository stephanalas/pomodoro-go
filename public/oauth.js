window.onload = () => {
  document.querySelector('.login').addEventListener('click', async () => {
    const {
      storage: { sync },
      identity: { getAuthToken, getProfileUserInfo },
    } = chrome;
    getAuthToken({ interactive: true }, async function (token) {
      sync.set({ authToken: token });
    });
    getProfileUserInfo({ accountStatus: 'ANY' }, (userInfo) => {
      sync.set(userInfo);
    });

    chrome.runtime.sendMessage('login', (response) => {
      console.log('after log in', response);
    });
    // sync.get(null, (result) => {
    //   const token = result.authToken;
    //   const email = result.email;
    //   console.log(result.email);
    //   console.log(result.token);
    //   fetch('http://localhost:8080/auth/google', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       authorization: token,
    //     },
    //     body: JSON.stringify(result),
    //   })
    //     .then((response) => {
    //       console.log('after fetch', response);
    //     })
    //     .then((data) => {
    //       sync.set({ user: data });
    //     })
    //     .catch((error) => console.log('Error:', error));
    // });
  });
};
