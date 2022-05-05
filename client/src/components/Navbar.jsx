import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <ul className="navbar">
    <Link className="Link active" to="/">Home</Link>
    <Link className="Link" to="favoriteArtists">Favorite Artists</Link>
  </ul>
  )
}

export default Navbar;
