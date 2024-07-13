import React, { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SaveToSpotifyButton from '../SaveToSpotifyButton';
import SearchButton from '../SearchButton';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Spotify from "../../util/Spotify";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = async (term) => {
    try {
      const results = await Spotify.search(term);
      setSearchResults(results);
    } catch (error) {
      setSearchResults([]);
    }
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const addTrack = (track) => {
    if (!playlistTracks.some(savedTrack => savedTrack.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id));
  };

  const savePlaylist = async () => {
    try {
      setIsLoading(true);
      const trackUris = playlistTracks.map(track => track.uri);
      await Spotify.savePlaylist(playlistName, trackUris);
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
      setIsLoading(false);
      alert('Playlist saved successfully!');
    } catch (error) {
      setIsLoading(false);
      alert('An error occurred while saving the playlist.');
    }
  };

  return (
    <div>
      {isLoading && <LoadingScreen />}
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <SaveToSpotifyButton onClick={savePlaylist} />
        <SearchButton />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAddTrack={addTrack} />
          <Playlist 
            playlistName={playlistName} 
            playlistTracks={playlistTracks} 
            onNameChange={updatePlaylistName} 
            onRemove={removeTrack} 
            onSave={savePlaylist} 
          />
        </div>
      </div>
    </div>
  );
};

export default App;
