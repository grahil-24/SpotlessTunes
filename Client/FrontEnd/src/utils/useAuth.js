import { useState, useEffect } from "react";
import axios from "axios";

export let access_token = ""

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    console.log("hii");
    axios
      .post("https://spotless-tunes.onrender.com/login", {
        code,
      })
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
        const response = await axios.post("https://spotless-tunes.onrender.com/refresh", {
          refreshToken,
        });
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
