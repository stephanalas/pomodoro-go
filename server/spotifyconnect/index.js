const router = require('express').Router();
const axios = require('axios');
const querystring = require('query-string');
require('dotenv').config();

module.exports = router;

let client_id = process.env.CLIENT_ID_SPOTIFY;
let redirect_uri = 'http://localhost:8080/callback';

router.get('/', async (req, res, next) => {
  try {
    const scope =
      'user-read-private user-read-email user-read-currently-playing user-read-playback-state user-modify-playback-state user-read-recently-played streaming';

    res.redirect(
      'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
        })
    );
  } catch (err) {
    next(err);
  }
});
