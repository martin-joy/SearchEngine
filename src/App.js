import React, { useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchForm from './task/SearchForm';
import Article from './task/Article';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [AnyArticles, setAnyArticles] = useState(true);
  const[searchQueryError,setSearchQueryError]=useState('')
  const [sortCriteria, setSortCriteria] = useState('');

  const handleSearch = async () => {
    setCurrentPage(1);
    setAnyArticles(true);
    setSearchResults([]);
    await fetchNewsArticles();
  };

  const fetchNewsArticles = async () => {
    try {
      let apiUrl = `https://newsapi.org/v2/everything?q=${searchQuery}&page=${currentPage}&apiKey=98ac428f0a234be0ba87ff3863b9296e`;

      if (sortCriteria) {
        apiUrl += `&sortBy=${sortCriteria}`;
      }

      const response = await axios.get(apiUrl);

      const { data } = response;
      const newResults = data.articles;

      if (newResults.length === 0) {
        setAnyArticles(false);
      } else {
        setSearchResults((prevResults) => [...prevResults, ...newResults]);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error occurred during search:', error);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.trim();
    setSearchQuery(inputValue);

    if (inputValue.length === 0) {
      setSearchQueryError('Search query cannot be empty.');
    } else if (inputValue.length < 3) {
      setSearchQueryError('Search query must be at least 3 characters long.');
    } else {
      setSearchQueryError('');
    }
  };

  const handleSortCriteriaChange = (e) => {
    setSortCriteria(e.target.value);
  };

  return (
    <div>
      <SearchForm
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        handleSortCriteriaChange={handleSortCriteriaChange}
        searchQueryError={searchQueryError}
        sortCriteria={sortCriteria} 
      />
      <div>
        <InfiniteScroll dataLength={searchResults.length} next={fetchNewsArticles} hasMore={AnyArticles}>
          {searchResults.map((article) => (
            <Article article={article} key={article.id} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
