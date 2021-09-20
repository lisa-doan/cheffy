import React from 'react';
import RecipeDetails from '../components/recipe-details';

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
    const { label, image } = this.props.result;
    const recipeDetails = this.props.result;
    if (this.state.isSaved) {
      return (
        <div className="modal-container">
          <div className="modal-content">
            <div className="right">
              <i onClick={this.closeMenu} className="fas fa-times times-icon"></i>
            </div>
            <p className="modal-message">{label.toLowerCase()} is added to your cookbook!</p>
          </div>
        </div>
      );
    }
    if (this.state.isClicked) {
      return (
        <div className="modal-container">
          <div className="modal-content">
            <div className="right">
              <i onClick={this.closeMenu} className="fas fa-times times-icon"></i>
            </div>
            <RecipeDetails recipeDetails={recipeDetails}/>
          </div>
        </div>
      );
    }
    return (
      <>
       <div className="title-container">
          <h3 onClick={this.handleClick}>{label.length > 27 ? label.slice(0, 27).toLowerCase() + '...' : label.toLowerCase()}</h3>
          <i onClick={this.handleSave} className="fas fa-plus-circle add-icon"></i>
      </div>
      <div className="img-container">
          <img onClick={this.handleClick} src={image}></img>
      </div>
      </>
    );
  }
}
