import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
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
function App() {
  // const code = new URLSearchParams(window.location.search).get("code");
  // const accessToken = useAuth(code);

    const ProtectedRoute = ({element: Element}) => {
        // Check if accessToken is present in localStorage
        const accessToken = localStorage.getItem('accessToken');

        // If accessToken is not present, redirect to login page
        if (!accessToken) {
            return <Navigate to="/" replace />;
        }

        // Render the route with the provided element
        return <Route element={<Element />} />;
    };

  return (
      <>
         <Router>
             <NavBar />
            <Routes>
              <Route path="/" element={<Login />} />
                <ProtectedRoute path="/home" element={<Home />} />
                <ProtectedRoute path="/remove-duplicates" element={<RemoveDuplicates />} />
              <Route path="/auth" element={<AuthCodeHandler />} />
                <ProtectedRoute path="/stats" element={<Statistics />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<Contact />} />
                <ProtectedRoute path="/search-songs" element={<SearchSongs />} />
                <ProtectedRoute path="/get-meaning" element={<SongMeaning />} />
                <ProtectedRoute path="/review" element={<Review />} />
            </Routes>
        </Router>
      </>
  );
}

export default App;
