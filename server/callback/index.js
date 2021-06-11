const router = require('express').Router();
const axios = require('axios');
const querystring = require('query-string');
require('dotenv').config();

module.exports = router;

let client_id = process.env.CLIENT_ID_SPOTIFY;
let client_secret = process.env.CLIENT_SECRET_SPOTIFY;
let redirect_uri = 'http://localhost:8080/callback';

router.get('/', async (req, res, next) => {
  try {
    let code = req.query.code;
    console.log(code);
    const auth = Buffer.from(`${client_id}:${client_secret}`).toString(
      'base64'
    );

    const params =
      'grant_type=authorization_code&code=' +
      code +
      '&redirect_uri=' +
      redirect_uri +
      '&client_id=' +
      client_id +
      '&client_secret=' +
      client_secret;
    try {
      let response = (
        await axios.post('https://accounts.spotify.com/api/token', params, {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
      ).data;
      console.log(response);
      res.redirect(
        'http://localhost:8080/home?' +
          querystring.stringify({
            access_token: response.access_token,
            refresh_token: response.refresh_token,
          })
      );
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    next(err);
  }
});
