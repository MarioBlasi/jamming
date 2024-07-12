import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

const SearchResults = ({ searchResults, onAddTrack }) => {
  return (
    <div className="SearchResults">
      <h2>Risultati di ricerca</h2>
      <TrackList tracks={searchResults} onAdd={onAddTrack} />
    </div>
  );
}

export default SearchResults;