import React from 'react';

const apiId = process.env.REACT_APP_API_ID;
const apiKey = process.env.REACT_APP_API_KEY;

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const input = this.state.value;
    fetch(`https://api.edamam.com/search?app_id=${apiId}&app_key=${apiKey}&q=${input}`)
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(error => console.error(error));
  }

  handleClick(event) {
    const input = event.target.value;
    fetch(`https://api.edamam.com/search?app_id=${apiId}&app_key=${apiKey}&q=${input}`)
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <>
      <div className="search-bar-container">
        <i className="fa fa-search search-icon"></i>
        <form onSubmit={this.handleSubmit}>
          <input className="search-box" type="search" placeholder="Search" value={this.state.value} onChange={this.handleChange} ></input>
        </form>
      </div>
      <div className="button-container">
        <button className="blue-button" value="breakfast" onClick={this.handleClick}>breakfast</button>
        <button className="blue-button" value="lunch" onClick={this.handleClick}>lunch</button>
        <button className="blue-button" value="dinner" onClick={this.handleClick}>dinner</button>
        <button className="blue-button" value="dessert" onClick={this.handleClick}>dessert</button>
      </div>
      </>
    );
  }

}
