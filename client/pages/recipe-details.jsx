import React from 'react';

const apiId = process.env.REACT_APP_API_ID;
const apiKey = process.env.REACT_APP_API_KEY;

export default class RecipeDetails extends React.Component {
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
    const { label, image, calories, totalNutrients, ingredientLines, url, source } = this.state.recipe[0];
    return (
      <>
      <div className="coobook-container">
        <div className="recipe-content">
          <div className="img-container">
            <img src={image}></img>
          </div>
          <h2><span className="underline">{label}</span></h2>
          <div className="row">
            <div className="row content">
                <div className="column">
                  <div className="circle">{Math.ceil(calories)} kcal</div>
                  </div>
                <div className="column">
                  <span>Protein: {Math.ceil(totalNutrients.PROCNT.quantity) + totalNutrients.PROCNT.unit}</span>
                  <span>Fat: {Math.ceil(totalNutrients.FAT.quantity) + totalNutrients.FAT.unit}</span>
                  <span>Carbs: {Math.ceil(totalNutrients.CHOCDF.quantity) + totalNutrients.CHOCDF.unit}</span>
                </div>
              </div>
          </div>
          <div className="ingredients-container">
            <div className="column">
              <div className="long-underline">
                <h3>Ingredients</h3>
              </div>
              <div className="content scrollbox">
                {ingredientLines.map((ingredient, index) => {
                  return (
                  <li key={index}>{ingredient}</li>
                  );
                })}
                </div>
              </div>
              <div className="column">
                <div className="long-underline">
                  <h3>Preparation</h3>
                </div>
                <div className="content">
                  <a href={url} target="_blank" rel="noreferrer"><button className="blue-button">Instructions</button></a>
                  <span className="content">
                    on </span>
                    <a href={url} target="_blank" rel="noreferrer"><u>{source}</u></a>
                </div>
              </div>
                <div className="button-container">
                  <a href={'#cookbook'}>
                    <button className="large-red-button">Back to Cookbook</button>
                  </a>
                </div>
                </div>
          </div>
      </div>
      </>
    );
  }
}
