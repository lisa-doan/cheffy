import React from 'react';
import Home from './pages/home';
import AppDrawer from './components/app-drawer';
import Search from './pages/search';

export default class App extends React.Component {

  render() {
    return (
      <div className="container">
    <AppDrawer />
    <Search />

    </div>
    );
  }
}
