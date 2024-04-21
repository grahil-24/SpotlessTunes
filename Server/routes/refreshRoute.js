const express = require('express');
const SpotifyWebApi = require("spotify-web-api-node");
const refreshRouter = express.Router();

const spotifyWebApi = new SpotifyWebApi({
    redirectUri: "https://spotless-tunes.vercel.app",
    clientId: "860060f6eb7743a2b87dcead95d611c3",
    clientSecret: "7c78c9585615427aa481ac10ad013dc7",
});

refreshRouter.post("/", function (req, res) {
    const refreshToken = req.body.refreshToken;

    spotifyWebApi.setRefreshToken(refreshToken);

    spotifyWebApi.refreshAccessToken().then(
        function(data) {
            console.log('The access token has been refreshed!');
            // Save the access token so that it's used in future calls
            spotifyWebApi.setAccessToken(data.body['access_token']);
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            });
        },
        function(err) {
            console.log('Could not refresh access token', err);
            res.status(500).json({ error: 'Could not refresh access token' });
        }
    );
});

module.exports = refreshRouter;
