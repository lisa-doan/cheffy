import React from 'react';

export default function RecipeCard(props) {
  return (
    <div className="card-container">
      <div className="img-container">
        <img src={props.img}></img>
      </div>
      <div className="title-container">
        <h3>{props.title}</h3>
        <i className="fas fa-plus-circle add-icon"></i>
      </div>
    </div>
  );
}
