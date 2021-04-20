import React from 'react';

export default class RecipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: false,
      isClicked: false
    };
    this.handleSave = this.handleSave.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSave() {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.props.result)
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

  closeMenu() {
    this.setState({
      isSaved: false,
      isClicked: false
    });
  }

  handleClick() {
    this.setState({
      isClicked: true
    });
  }

  render() {
    const { label, image, calories, totalNutrients, ingredientLines, url, source } = this.props.result;
    if (this.state.isSaved) {
      return (
        <div className="modal-container">
          <div className="modal-content">
            <div className="right">
              <i onClick={this.closeMenu} className="fas fa-times times-icon"></i>
            </div>
            <p className="modal-message">{label} is added to your cookbook!</p>
          </div>
        </div>
      );
    }
    if (this.state.isClicked) {
      return (
        // RecipeDetails
        <div className="modal-container">
          <div className="recipe-container">
            <div className="right">
              <i onClick={this.closeMenu} className="fas fa-times times-icon"></i>
            </div>
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
              </div>
              </div>
          </div>
        </div>
      );
    }
    return (
      <>
       <div className="title-container">
          <h3 onClick={this.handleClick}>{label}</h3>
          <i onClick={this.handleSave} className="fas fa-plus-circle add-icon"></i>
      </div>
      <div className="img-container">
          <img onClick={this.handleClick} src={image}></img>
      </div>
      </>
    );
  }
}
