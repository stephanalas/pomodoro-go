window.onload = () => {
  document.querySelector('button').addEventListener('click', () => {
    const {
      storage: { sync },
      identity: { getAuthToken, getProfileUserInfo },
    } = chrome;
    getAuthToken({ interactive: true }, function (token) {
      sync.set({ authToken: token });
    });
    getProfileUserInfo({ accountStatus: 'ANY' }, (userInfo) => {
      sync.set({ email: userInfo.email });
    });
    sync.get(null, (result) => {
      const token = result.authToken;
      console.log(token);

      fetch('http://localhost:8080/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          authorization: token,
        },
        body: JSON.stringify({
          email: result.email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          sync.set({ user: data });
        })
        .catch((error) => console.log('Error:', error));
    });
  });
};
