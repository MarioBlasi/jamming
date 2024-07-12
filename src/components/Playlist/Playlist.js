import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

const Playlist = ({ playlistName, playlistTracks, onNameChange, onRemove, onSave }) => {
  const handleNameChange = (e) => {
    onNameChange(e.target.value);
  };

  const handleSave = () => {
    const trackURIs = playlistTracks.map(track => track.uri); // Simulazione degli URI
    onSave(trackURIs); // Chiamiamo la funzione onSave passando gli URI delle tracce
  };

  return (
    <div className="Playlist">
      <input
        value={playlistName}
        onChange={handleNameChange}
        placeholder="Enter playlist name"
        className="Playlist-input"
      />
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button className="Playlist-save" onClick={handleSave}>SAVE TO SPOTIFY</button>
    </div>
  );
};

export default Playlist;
