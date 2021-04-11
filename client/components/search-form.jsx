import React from 'react';
import RecipeCard from './recipe-card';

const apiId = process.env.REACT_APP_API_ID;
const apiKey = process.env.REACT_APP_API_KEY;

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      results: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let input = '';
    if (event.target.value) {
      input = event.target.value;
    } else {
      input = this.state.value;
    }
    fetch(`https://api.edamam.com/search?app_id=${apiId}&app_key=${apiKey}&from=0&to=9&q=${input}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ results: data.hits });
      })
      .catch(error => console.error(error));
  }

  render() {
    console.log('state.results: ', this.state.results);

    return (
      <>
      <div className="search-content">
        <form className="search-bar-container" onSubmit={this.handleSubmit}>
          <i className="fa fa-search search-icon"></i>
          <input className="search-box" type="search" placeholder="Search" value={this.state.value} onChange={this.handleChange} ></input>
        </form>
      <div className="button-container">
        <button className="blue-button" value="breakfast" onClick={this.handleSubmit}>breakfast</button>
        <button className="blue-button" value="lunch" onClick={this.handleSubmit}>lunch</button>
        <button className="blue-button" value="dinner" onClick={this.handleSubmit}>dinner</button>
        <button className="blue-button" value="dessert" onClick={this.handleSubmit}>dessert</button>
      </div>
      </div>
      <div className="results-container">
        {this.state.results.map(recipe => {
          return (
          <RecipeCard
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            img={recipe.recipe.image}
          />
          );
        })}
        </div>
      </>
    );
  }

}
