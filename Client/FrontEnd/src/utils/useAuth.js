import { useState, useEffect } from "react";
import axios from "axios";

export let access_token = ""

export default function   useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    console.log("hii");
    axios.post(
        "https://spotless-tunes.onrender.com/login",
        {
          code,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*', // Set the origin to allow (or use a specific domain)
            'Access-Control-Allow-Methods': 'POST', // Specify the allowed HTTP methods
            'Access-Control-Allow-Headers': 'Content-Type', // Specify the allowed headers
          }
        }
    )
      .then((res) => {
        console.log("1. " + res.data.accessToken);
        setAccessToken(res.data.accessToken);
        access_token = res.data.accessToken;
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        // window.history.pushState({}, null, "/");
      })
      .catch(function (err) {
        console.log(err);
        window.location = "/";
      });
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    const interval = setInterval(async () => {
      try {
        const response = await axios.post(
            "https://spotless-tunes.onrender.com/refresh",
            {
              refreshToken,
            },
            {
              headers: {
                'Access-Control-Allow-Origin': '*', // Set the origin to allow (or use a specific domain)
                'Access-Control-Allow-Methods': 'POST', // Specify the allowed HTTP methods
                'Access-Control-Allow-Headers': 'Content-Type', // Specify the allowed headers
              }
            }
        );
        setAccessToken(response.data.accessToken);
        access_token = response.data.accessToken;
      } catch (err) {
        window.location = "/";
      }
    }, (expiresIn - 60) * 1000);

    return () => {
      clearInterval(interval);
      setAccessToken(null); // Trigger a re-render with null accessToken
      access_token = ""
    };
  }, []);

  return accessToken;
}
