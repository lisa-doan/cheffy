import React from 'react';
import SearchForm from '../components/search-form';

export default function Search(props) {
  return (
      <div className="search-container">
         <h1>Search Recipes</h1>
        <SearchForm />
      </div>
  );
}
