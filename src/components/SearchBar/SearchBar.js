import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleTermChange = (e) => {
    setTerm(e.target.value);
  };

  const search = () => {
    onSearch(term);
  };

  return (
    <div className="SearchBar">
      <input 
        placeholder="Enter A Song, Album, or Artist" 
        value={term}
        onChange={handleTermChange}
      />
      <button className="SearchButton" onClick={search}>SEARCH</button>
    </div>
  );
};

export default SearchBar;
