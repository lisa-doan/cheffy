import React from 'react';

const apiId = process.env.REACT_APP_API_ID;
const apiKey = process.env.REACT_APP_API_KEY;

export default class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null
    };
  }

  componentDidMount() {
    fetch(`https://api.edamam.com/search?app_id=${apiId}&app_key=${apiKey}&r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${this.props.recipeId}`)
      .then(res => res.json())
      .then(recipe => this.setState({ recipe }));
  }

  render() {
    if (!this.state.recipe) return null;
    const { label, image, calories, totalNutrients, ingredientLines, url, source } = this.state.recipe[0];
    return (
      <div className="recipe-container">
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
                <span className="row">Protein: {Math.ceil(totalNutrients.PROCNT.quantity) + totalNutrients.PROCNT.unit}</span>
                <span className="row">Fat: {Math.ceil(totalNutrients.FAT.quantity) + totalNutrients.FAT.unit}</span>
                <span className="row">Carbs: {Math.ceil(totalNutrients.CHOCDF.quantity) + totalNutrients.CHOCDF.unit}</span>
              </div>
            </div>
         </div>
         <div className="ingredients-container">
           <div className="column">
             <div className="long-underline">
              <h3>Ingredients</h3>
             </div>
             <div className="content">
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
         </div>
      </div>
    );
  }
}
