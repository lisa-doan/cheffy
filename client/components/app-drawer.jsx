import React from 'react';

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
    if (this.state.isVisible) {
      return (
      <div className="menu-container" onClick={this.closeMenu}>
        <div className="menu-content">
          <h1>Cheffy</h1>
          <a href="" onClick={this.handleClick}><h3>Search</h3></a>
          <a href={'#cookbook'} onClick={this.handleClick}><h3>Cookbook</h3></a>
          {/* <a href=""onClick={this.handleClick}>Meal Plan</a>
          <a href=""onClick={this.handleClick}>Shopping List</a>
          <a href=""onClick={this.handleClick}>Timer</a>
          <a href=""onClick={this.handleClick}>Unit Conversion</a> */}
        </div>
      </div>
      );
    } else {
      return (
      <div className="container">
        <i className="fas fa-bars" onClick={this.handleMenuClick}></i>
      </div>
      );
    }
  }
}
