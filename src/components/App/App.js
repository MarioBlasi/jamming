// components/App.js

import React, { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SaveToSpotifyButton from '../SaveToSpotifyButton';
import SearchButton from '../SearchButton';
import Spotify from "../../util/Spotify";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // Function to perform search and update searchResults
  const search = async (term) => {
    try {
      const results = await Spotify.search(term);
      setSearchResults(results);
    } catch (error) {
      console.error('Error during search:', error);
      setSearchResults([]);
    }
  };

  // Function to update playlist name
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  // Function to add a track to the playlist
  const addTrack = (track) => {
    if (!playlistTracks.some(savedTrack => savedTrack.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  // Function to remove a track from the playlist
  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id));
  };

  // Function to save the playlist to Spotify
  const savePlaylist = async () => {
    try {
      const trackUris = playlistTracks.map(track => track.uri);
      await Spotify.savePlaylist(playlistName, trackUris);
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
      alert('Playlist saved successfully!');
    } catch (error) {
      console.error('Error saving playlist:', error);
      alert('An error occurred while saving the playlist.');
    }
  };

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAddTrack={addTrack} />
          <Playlist 
            playlistName={playlistName} 
            playlistTracks={playlistTracks} 
            onNameChange={updatePlaylistName} 
            onRemove={removeTrack} 
            onSave={savePlaylist} // Pass savePlaylist function to Playlist component
          />
        </div>
        <SaveToSpotifyButton onClick={savePlaylist} />
        <SearchButton />
      </div>
    </div>
  );
};

export default App;
