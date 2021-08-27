import React from 'react';
import AppDrawer from '../components/app-drawer';
import SearchForm from '../components/search-form';

export default function Search(props) {
  return (
  <>
    <div className="menu">
      <AppDrawer />
    </div>
    <header><h1>search recipes</h1></header>
    <SearchForm />
  </>
  );
}
