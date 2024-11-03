import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import PageNotFound from './components/PageNotFound';
import Profile from './components/Profile/Profile';
import HomePage from './components/HomePage';
import Friends from './components/Friendo/Friends';
import Favorites from './components/Favorites/Favorites';
import Serie from './components/Serie/Serie';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path='/friends' element={<Friends />} />
        <Route path='/logout' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/serie/:id" element={<Serie />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default App