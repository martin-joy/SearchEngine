import React from 'react';
import './SearchForm.css';

function SearchForm({ searchQuery, handleInputChange, handleSearch, handleSortCriteriaChange, searchQueryError, sortCriteria }) {
  return (
    <div className="search-form">
      <label htmlFor="search-input">Search Query:</label>
      <input
        type="text"
        id="search-input"
        value={searchQuery}
        placeholder="Enter your search query"
        onChange={handleInputChange}
        className="search-input"
      />

      <label htmlFor="sort-criteria">Sort Criteria:</label>
      <select
        id="sort-criteria"
        value={sortCriteria}
        onChange={handleSortCriteriaChange}
        className="sort-criteria" 
      >
        <option value="relevancy">Relevance</option>
        <option value="popularity">Popularity</option>
        <option value="publishedAt">Publication Date</option>
      </select>

      <button
        onClick={handleSearch}
        className="search-button" 
      >
        Search
      </button>

      {searchQueryError && <p className="error-message">{searchQueryError}</p>} 
    </div>
  );
}

export default SearchForm;
