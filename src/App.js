
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import DynamicPage from './components/DynamicPage';
import DetailPage from './components/DetailPage';
import VenueDetailPage from './components/VenueDetailPage';
import SeatSelection from './components/SeatSelection'
import SeanslarSection from './components/SeanslarSection';
import data from './data/bilet.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilmYorum from './components/FilmYorum';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProfilePage from './components/ProfilePage';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Regular categories */}
        <Route path="/:category" element={<DynamicPage />} />
        {/* Subcategories from "diger" */}
        <Route path="/diger/:subcategory" element={<DynamicPage />} />
        <Route path="/details/:category/:id" element={<DetailPage />} />
        <Route path="/venue/:venueName" element={<VenueDetailPage />} />
        // Example Route for the Seat Selection Page
        <Route path="/" element={<SeanslarSection item={data.movies[0]} />} />
        
        {/* Dynamic route for Seat Selection */}
        <Route path="/seat-selection/:id" element={<SeatSelection />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/movie/:id" element={<FilmYorum />} />
        <Route path='/' element={<HomePage/>}/>
      </Routes>

      
    </Router>
  );
}

export default App;
