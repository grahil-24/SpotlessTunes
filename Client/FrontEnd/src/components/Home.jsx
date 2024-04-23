import { Link } from "react-router-dom";
import "../styles/home.css"; // Import CSS file
import spotifyService from "../utils/SpotifyService.js";
import {ChakraProvider} from "@chakra-ui/react";
import {
  Text, Button,  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton,
  ModalBody, Input, ModalFooter, AlertIcon, AlertDescription, Alert
} from "@chakra-ui/react"
import {useEffect, useState} from "react";
const Home = () => {

  const accessToken = localStorage.getItem("accessToken");
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [bugDescriptionStatus, setBugDescriptionStatus] = useState("new");
  const service = spotifyService(accessToken);

  useEffect(() => {

    const fetchUserDetails = async () => {
      try{
        const me = await service.getMe();
        localStorage.setItem("user", me);
      }catch(err){
        console.log(err);
      }
    }

    fetchUserDetails();

  }, [accessToken]);

  const handleBugSubmit = async () => {
    const name = localStorage.getItem("user");
    console.log(name);
    if(bugDescription === ""){
      setBugDescriptionStatus("warning");
    }else{
      try{
        const res = await fetch("https://spotless-tunes.onrender.com/user/bug-report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*', // Set the origin to allow (or use a specific domain)
            'Access-Control-Allow-Methods': '*', // Specify the allowed HTTP methods
            'Access-Control-Allow-Headers': 'Content-Type',
          },
          body: JSON.stringify({
            description: bugDescription,
            name: name
          })
        })
        if (res.ok) {
          // If successful, you can handle the response data here
          await res.json();
          setBugDescriptionStatus("success");
        }

      }catch(err){
        console.log(err);
      }finally{
        setBugDescription("");
      }
    }
  }

  const bugWarningComponent = () => {
    return (
        <Alert status='warning' maxW={"80%"} maxH={"15"} marginBottom={3} borderRadius={2}>
          <AlertIcon />
          <AlertDescription>Please enter a valid description</AlertDescription>
        </Alert>
    )
  }

  const bugSuccessComponent = () => {
    return (
        <Alert status='success' maxW={"80%"} maxH={"15"} marginBottom={3} borderRadius={2}>
          <AlertIcon />
          <AlertDescription>Bug reported successfully!</AlertDescription>
        </Alert>
    )
  }


  return (
      <ChakraProvider>
      <div className="home-container">
        <div className="home-cards">
          <div className="home-card">
            <div className="card-body">
              <h2 className="card-title">Remove Duplicates</h2>
              <p className="card-description">
                Click here to remove duplicate tracks from your Spotify playlist.
              </p>
              <div className="card-link">
                <Link to="/remove-duplicates">
                  <button className="home-button">Remove duplicates</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="home-card">
            <div className="card-body">
              <h2 className="card-title">View Statistics</h2>
              <p className="card-description">
                Click here to view statistics about your Spotify playlist.
              </p>
              <div className="card-link">
                <Link to="/stats">
                  <button className="home-button">View statistics</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="home-card">
            <div className="card-body">
              <h2 className="card-title">Lyrics Meaning</h2>
              <p className="card-description">
                Explore song lyrics and their meanings effortlessly.
              </p>
              <div className="card-link">
                <Link to="/search-songs">
                  <button className="home-button">Discover</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="home-card">
            <div className="card-body">
              <h2 className="card-title">Export Playlists</h2>
              <p className="card-description">
                Export your Spotify playlists to JSON or CSV format and import
                them to create a playlist anytime!
              </p>
              <div className="card-link">
                <Link to="/export-playlists">
                  <button className="home-button">Export playlists</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={isBugReportOpen} onClose={() => setIsBugReportOpen(false)}>
          <ModalOverlay/>
          <ModalContent style={{backgroundColor: '#008080'}}>
            <ModalHeader>Report a Bug</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={2}>Describe the bug you encountered:</Text>
              {bugDescriptionStatus === "warning" && bugWarningComponent()}
              {bugDescriptionStatus === "success" && bugSuccessComponent()}
              <Input
                  placeholder="Enter bug description"
                  value={bugDescription}
                  onChange={(e) => setBugDescription(e.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={handleBugSubmit}>
                Submit
              </Button>
              <Button onClick={() => {setIsBugReportOpen(false);setBugDescription(""); setBugDescriptionStatus("new")}}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>


        {/* Bug Report Button */}
        <Button
            position="fixed"
            bottom={4}
            right={4}
            colorScheme="red"
            onClick={() => setIsBugReportOpen(true)}
        >
          Report Bug
        </Button>
      </div>
      </ChakraProvider>
  );
};

export default Home;
