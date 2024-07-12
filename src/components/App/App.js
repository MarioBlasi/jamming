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

  // Funzione per eseguire la ricerca e aggiornare searchResults
  const search = async (term) => {
    try {
      const results = await Spotify.search(term);
      setSearchResults(results);
    } catch (error) {
      console.error('Errore durante la ricerca:', error);
      setSearchResults([]);
    }
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

  // Funzione per salvare la playlist su Spotify
  const savePlaylist = async (trackURIs) => {
    try {
      // Simulazione di una chiamata API per salvare la playlist su Spotify
      console.log('Salvataggio della playlist con URI:', trackURIs);

      // Simulazione di reset della playlist
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
      
      alert('Playlist salvata con successo!');
    } catch (error) {
      console.error('Errore nel salvataggio della playlist:', error);
      alert('Si è verificato un errore durante il salvataggio della playlist.');
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
            onSave={savePlaylist} // Passiamo la funzione savePlaylist al componente Playlist
          />
        </div>
        <SaveToSpotifyButton />
        <SearchButton />
      </div>
    </div>
  );
};

export default App;
