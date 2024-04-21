import "../styles/login.css";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=860060f6eb7743a2b87dcead95d611c3&response_type=code&redirect_uri=https://spotless-tunes.vercel.app&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-modify-private%20user-top-read";

function Login() {

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        let code = new URLSearchParams(window.location.search).get("code");
        code = code.trim();
        console.log("Code:", code);

        if (code) {
          const response = axios.post(
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
          );
          console.log("Response:", response.data);

          const accessToken = response.data.accessToken;
          console.log("Access Token:", accessToken);

          localStorage.setItem("accessToken", accessToken);
          navigate("/home");
        }
      } catch (error) {
        console.error("Error exchanging code for access token:", error);
        navigate("/?error=authentication_failed");
      }
    };

    fetchAccessToken();
  }, [navigate]);

  return (
      <>
        <div className="content-wrapper">
          <div className="container">
            <div className="centered-content">
              <img src="/images/Spotless%20Tunes-logo.png"></img>
              <p className="wider-paragraph">
                Introducing our all-in-one Spotify Playlist Manager! Effortlessly
                declutter your playlists by removing duplicates, while gaining
                valuable insights with detailed statistics. Streamline your music management
                experience with our versatile tool, designed to enhance convenience
                and enjoyment across platforms.
              </p>
              <Link to={AUTH_URL} className="login-button">
                <img src="/images/webstorm.png" alt="Spotify Logo" />
                Login with Spotify
              </Link>
            </div>
          </div>
        </div>
      </>
  );
}

export default Login;
