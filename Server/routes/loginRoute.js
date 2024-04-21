const express = require('express');
const SpotifyWebApi = require("spotify-web-api-node");
const loginRouter = express.Router();

const spotifyWebApi = new SpotifyWebApi({
    redirectUri: "https://spotless-tunes.vercel.app",
    clientId: "860060f6eb7743a2b87dcead95d611c3",
    clientSecret: "7c78c9585615427aa481ac10ad013dc7",
});

loginRouter.post("/", function (req, res) {
    const code = req.body.code;
    console.log(code);
    console.log("Inside /login server side");

    spotifyWebApi
        .authorizationCodeGrant(code)
        .then((data) => {
            console.log("hii from server");
            console.log(data.body);
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            });
            spotifyWebApi.setAccessToken(data.body['access_token']);
            spotifyWebApi.setRefreshToken(data.body['refresh_token']);
        })
        .catch((err) => {
            res.json({
                error: err,
            });
        });
});

module.exports = loginRouter;