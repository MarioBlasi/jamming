import React, { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SaveToSpotifyButton from '../SaveToSpotifyButton';
import SearchButton from '../SearchButton';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // Funzione per simulare una ricerca e aggiornare searchResults
  const search = (term) => {
    const hardcodedTracks = [
      { id: '1', name: 'Song 1', artist: 'Artist 1', album: 'Album 1' },
      { id: '2', name: 'Song 2', artist: 'Artist 2', album: 'Album 2' },
      { id: '3', name: 'Song 3', artist: 'Artist 3', album: 'Album 3' },
    ];
    setSearchResults(hardcodedTracks);
  };

  // Funzione per aggiornare il nome della playlist
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  // Funzione per aggiungere una traccia alla playlist
  const addTrack = (track) => {
    if (!playlistTracks.some(savedTrack => savedTrack.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  // Funzione per rimuovere una traccia dalla playlist
  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id));
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
          />
        </div>
        <SaveToSpotifyButton />
        <SearchButton />
      </div>
    </div>
  );
};

export default App;

