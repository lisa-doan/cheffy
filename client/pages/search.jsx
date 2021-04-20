import React from 'react';
import AppDrawer from '../components/app-drawer';
import SearchForm from '../components/search-form';

export default function Search(props) {
  return (
  <>
    <div className="menu">
      <AppDrawer />
    </div>
    <header><h1>Search Recipes</h1></header>
    <div className="search-container">
      <SearchForm />
    </div>
  </>
  );
}
