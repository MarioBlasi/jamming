import React from 'react';
import './SaveToSpotifyButton.css';

const SaveToSpotifyButton = ({ onClick }) => {
  return (
    <button className="save-to-spotify-button" onClick={onClick}>
      Save To Spotify
    </button>
  );
};

export default SaveToSpotifyButton;
