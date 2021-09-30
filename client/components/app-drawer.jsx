import React from 'react';
import AppContext from '../lib/app-context';

export default class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  handleMenuClick() {
    this.setState({ isVisible: true });
  }

  closeMenu() {
    this.setState({ isVisible: false });
  }

  render() {
    const { handleSignOut } = this.context;
    if (this.state.isVisible) {
      return (
      <div className="menu-container" onClick={this.closeMenu}>
        <div className="menu-content">

          <h1>cheffy</h1>
          <a href={'#search'} onClick={this.handleClick}><h3>search</h3></a>
          <a href={'#cookbook'} onClick={this.handleClick}><h3>cookbook</h3></a>

          <a href="" onClick={handleSignOut}><h3>sign out</h3></a>

        </div>
      </div>
      );
    } else {
      return (
      <div className="container">
        <i className="fas fa-bars menu-icon" onClick={this.handleMenuClick}></i>
      </div>
      );
    }
  }
}

AppDrawer.contextType = AppContext;
