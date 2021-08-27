import React from 'react';

export default class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
  // this.state = {
  //   recipe: null,
  //   isSaved: false
  // };
  // this.handleSave = this.handleSave.bind(this);
  }

  render() {
    if (!this.props.recipeDetails) return null;
    const { label, image, calories, totalNutrients, ingredientLines, url } = this.props.recipeDetails;

    return (
      <>
      <div className="row">
        <div className="column">
          <div className="row">
            <h2><span className="underline">{label.toLowerCase()}</span></h2>
          </div>
          <div className="row">
            <div className="column">
              <div className="circle">{Math.ceil(calories)} kcal</div>
            </div>
            <div className="column content">
              <span>protein: {Math.ceil(totalNutrients.PROCNT.quantity) + totalNutrients.PROCNT.unit}</span>
              <span>fat: {Math.ceil(totalNutrients.FAT.quantity) + totalNutrients.FAT.unit}</span>
              <span>carbs: {Math.ceil(totalNutrients.CHOCDF.quantity) + totalNutrients.CHOCDF.unit}</span>
            </div>
            <div className="column">
              <a href={url} target="_blank" rel="noreferrer">
                <button className="blue-button">instructions</button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <img src={image}></img>
        </div>
        <div className="column">
          <span className="underline"><h3>ingredients</h3></span>
          {/* check width for scroll */}
          <div className="row">
            <div className="content scrollbox">
              {ingredientLines.map((ingredient, index) => {
                return (
                  <li key={index}>{ingredient}</li>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}
