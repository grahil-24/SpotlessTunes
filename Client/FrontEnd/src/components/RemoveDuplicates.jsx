import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/removeduplicates.css";
import spotifyService from "../utils/SpotifyService.js";

function RemoveDuplicates() {
  const accessToken = localStorage.getItem("accessToken");

  const [playlists, setPlaylists] = useState([]);
  const [loadingPlaylistIds, setLoadingPlaylistIds] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [noDuplicatesFound, setNoDuplicatesFound] = useState(false); // State to track if no duplicates found
  const service = spotifyService(accessToken);
  useEffect(() => {
    // Fetch playlists data from an API endpoint
    const fetchPlaylists = async () => {
      service.getUserPlaylists().then((data) => {
        setPlaylists(data);
      });
    };

    fetchPlaylists();
  }, [accessToken]);

  const getDuplicates = async (playlistId) => {
    if (!accessToken || loadingPlaylistIds.includes(playlistId)) return;

    setLoadingPlaylistIds((prevLoadingIds) => [...prevLoadingIds, playlistId]);

    try {
      const data = await service.getPlaylistTracksWithDuplicates(playlistId);

      setPlaylists((prevPlaylists) =>
          prevPlaylists.map((playlist) => {
            if (playlist.id === playlistId) {
              const hasDuplicates = data.duplicates && data.duplicates.length > 0;
              // setNoDuplicatesFound(true);
              return {
                ...playlist,
                tracks: data.duplicates,
                hasDuplicates: hasDuplicates,
              };
            }
            return playlist;
          })
      );
    } catch (error) {
      console.error("Error fetching duplicates:", error);
    } finally {
      setLoadingPlaylistIds((prevLoadingIds) =>
          prevLoadingIds.filter((id) => id !== playlistId)
      );
    }
  };

  const removeDuplicates = async (playlistId) => {
    let playlist;
    console.log("playlistId", playlistId);
    playlists.forEach((p) => {
      if (p.id === playlistId) {
        playlist = p;
      }
    });
    try {
      const pos = [];
      playlist.tracks.forEach((track) => pos.push(track.pos));
      await service
          .removeDuplicateTracksFromPlaylist(
              playlist.id,
              playlist.snapshot_id,
              pos
          )
          .then((r) => {
            console.log(r);
            //   alert("Duplicate tracks have been removed.");
            console.log(r);
            setShowPopup(true); // Show popup after removal
            setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
            window.location.reload(); // Reload the page after removal
          });
    } catch (err) {
      console.log(`error in removed duplicates function ${err}`);
    }
  };

  return (
      <div className="dashboard-container">
        <h2 className="dashboard-heading">Your Playlists</h2>
        <ul className="playlists-list">
          {playlists.map((playlist) => (
              <li key={playlist.id} className="playlist-item">
                <div className="playlist-info">
                  {playlist.name && (
                      <span className="playlist-name">{playlist.name}</span>
                  )}
                  <div className="playlist-actions">
                    <button
                        className="playlist-action-button"
                        onClick={() => {
                          if (playlist.hasDuplicates) {
                            removeDuplicates(playlist.id);
                          } else {
                            getDuplicates(playlist.id);
                          }
                        }}
                        disabled={loadingPlaylistIds.includes(playlist.id)}
                    >
                      {loadingPlaylistIds.includes(playlist.id)
                          ? "Loading..."
                          : noDuplicatesFound // Check if no duplicates found
                              ? "No Duplicates Found" // Button text when no duplicates found
                              : playlist.hasDuplicates
                                  ? "Remove Duplicates"
                                  : "Get Duplicates"}
                    </button>
                  </div>
                </div>
                {playlist.hasDuplicates && playlist.tracks && (
                    <div className="duplicate-tracks">
                      <h4>Duplicate Tracks:</h4>
                      <ul>
                        {playlist.tracks.map((track) => (
                            <li key={track.id}>
                              {track.name} - {track.artist}
                            </li>
                        ))}
                      </ul>
                      <br />
                    </div>
                )}
              </li>
          ))}
        </ul>
      </div>
  );
}

RemoveDuplicates.propTypes = {
  accessToken: PropTypes.string,
};

export default RemoveDuplicates;
