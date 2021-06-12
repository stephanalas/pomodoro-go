import axios from 'axios';

const GET_CURRPLAYBACK = 'GET_CURRPLAYBACK';

//get current playback
export const getCurrPlayback = (accessToken) => {
  return async(dispatch) => {
    try {
      const params = 'market=from_token';
      let currPlayback = (
        await axios.get(`https://api.spotify.com/v1/me/player?${params}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      ).data;
      dispatch(_getCurrPlayback(currPlayback));
    } catch(err) {
      console.log(err);
    }
  };
};

const _getCurrPlayback = (currPlayback) => {
  return {
    type: GET_CURRPLAYBACK,
    currPlayback
  };
};

const currPlaybackReducer = (state = {}, action) => {
  if (action.type === GET_CURRPLAYBACK) {
    return (state = action.currPlayback);
  }
  return state;
};

export default currPlaybackReducer;
