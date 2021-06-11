import axios from 'axios';

const ADD_TO_QUEUE = 'ADD_TO_QUEUE';

//add a track to queue
export const addToQueue = (accessToken, trackUri) => {
  return async (dispatch) => {
    try {
      let newlyAdded = (
        await axios.post(
          `https://api.spotify.com/v1/me/player/queue?uri=${trackUri}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
      ).data;
      dispatch(_addToQueue(newlyAdded));
    } catch (err) {
      console.log(err);
    }
  };
};

const _addToQueue = (newlyAdded) => {
  return {
    type: ADD_TO_QUEUE,
    newlyAdded,
  };
};

const addToQueueReducer = (state = {}, action) => {
  if (action.type === ADD_TO_QUEUE) {
    return (state = action.newlyAdded);
  }
  return state;
};

export default addToQueueReducer;
