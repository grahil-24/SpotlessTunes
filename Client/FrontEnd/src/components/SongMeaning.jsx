import { useEffect, useState } from "react";
import "../styles/SongMeaning.css";
import {Box, ChakraProvider, Skeleton} from "@chakra-ui/react";

const SongMeaning = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const songName = searchParams.get("name");
    const artistName = searchParams.get("artist");
    const [lyrics, setLyrics] = useState("");
    const [lyricsLoaded, setLyricsLoaded] = useState(false);
    const [meaningLoaded, setMeaningLoaded] = useState(false);
    const [meaning, setMeaning] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLyricsAndMeaning = async () => {
            try {
                const response = await fetch(`https://spotless-tunes.onrender.com/lyrics?name=${songName}&artist=${artistName}`);
                if (response.ok) {
                    const { lyrics, meaning } = await response.json();
                    setLyrics(lyrics);
                    setMeaning(meaning);

                    setError("");
                } else if (response.status === 404) {
                    setError("Lyrics not found for this song.");

                } else {
                    setError("Error fetching lyrics from server");
                }
            } catch (err) {
                console.error("Error fetching lyrics from server", err);
                setError("Error fetching lyrics from server");
            }finally{
                setLyricsLoaded(true);
                setMeaningLoaded(true);
            }
        };

        fetchLyricsAndMeaning();
    }, [songName, artistName]);

    const formatLyrics = (lyrics) => {
        const lines = lyrics.split("\n");
        return lines.map((line, index) => <p key={index}>{line}</p>);
    };

    return (
        <ChakraProvider resetCSS={false}>
            <div className="parent-container">
                <div className="title">
                    <h2>{songName} By {artistName}</h2>
                </div>
                <div className="headers">
                    <h2>Lyrics</h2>
                    <h2>Meaning</h2>
                </div>
                {error && <div className="error" style={{ color: "red" }}>{error}</div>}
                {lyricsLoaded && meaningLoaded ? (
                    <div className="lyrics-meaning">
                        <div className="lyrics">{formatLyrics(lyrics)}</div>
                        <div className="meaning">{formatLyrics(meaning)}</div>
                    </div>
                ) : (
                    <Box spacing={3} className="lyrics-meaning-loading">
                        <div className="loading-lyrics">
                            {/* Skeletons for lyrics */}
                            <Skeleton height='20px' style={{ marginBottom: "10px" }} />
                            <Skeleton height='20px' style={{ marginBottom: "10px" }} />
                            <Skeleton height='20px' style={{ marginBottom: "10px" }} />
                        </div>
                        <div className="loading-meaning">
                            {/* Skeletons for meaning */}
                            <Skeleton height='20px' style={{ marginBottom: "10px" }} />
                            <Skeleton height='20px' style={{ marginBottom: "10px" }} />
                            <Skeleton height='20px' style={{ marginBottom: "10px" }} />
                        </div>
                    </Box>

                )}
            </div>
        </ChakraProvider>
    );
}

export default SongMeaning;
