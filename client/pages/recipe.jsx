import React from 'react';
import AppDrawer from '../components/app-drawer';
import RecipeDetails from '../components/recipe-details';

const apiId = process.env.REACT_APP_API_ID;
const apiKey = process.env.REACT_APP_API_KEY;

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
      isSaved: false
    };
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    fetch(`https://api.edamam.com/search?app_id=${apiId}&app_key=${apiKey}&r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${this.props.recipeId}`)
      .then(res => res.json())
      .then(recipe => this.setState({ recipe }));
  }

  handleSave() {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.recipe[0])
    };
    fetch('/api/cookbook/', req)
      .then(res => res.json())
      .then(data => {
        this.setState({
          isSaved: true
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.recipe) return null;
    // const { label, image, calories, totalNutrients, ingredientLines, url, source } = this.state.recipe[0];
    const recipeDetails = this.state.recipe[0];
    return (
      <>
      <div className="menu">
        <AppDrawer />
      </div>

      <header><h1>recipe</h1></header>
      <RecipeDetails recipeDetails = {recipeDetails}/>

      <div className="button-container">
        <a href={'#cookbook'}>
          <button className="large-red-button">back to cookbook</button>
        </a>
      </div>
      </>
    );
  }
}
