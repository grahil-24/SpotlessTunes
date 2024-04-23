import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Login.jsx";
import RemoveDuplicates from "./components/RemoveDuplicates.jsx";
import AuthCodeHandler from "./components/AuthCodeHandler.jsx";
import NavBar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Statistics from "./components/Statistics.jsx";
import AboutPage from "./components/AboutPage.jsx";
import Contact from "./components/Contact.jsx";
import SearchSongs from "./components/SearchSongs.jsx";
import SongMeaning from "./components/SongMeaning.jsx";
import Review from "./components/Review.jsx";
import {ChakraProvider} from "@chakra-ui/react";
function App() {


  return (
      <>
        <Router>
             <NavBar />
            User
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/home"
                    element={
                        <ChakraProvider>
                            <Home />
                        </ChakraProvider>
                    }
                />
                <Route path="/remove-duplicates" element={<RemoveDuplicates />} />
                <Route path="/auth" element={<AuthCodeHandler />} />
                <Route path="/stats" element={<Statistics />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/search-songs" element={<SearchSongs />} />
                <Route path="/get-meaning" element={<SongMeaning />} />
                <Route path="/review" element={<Review />} />
            </Routes>
        </Router>
      </>
  );
}

export default App;