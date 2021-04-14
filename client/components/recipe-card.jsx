import React from 'react';

export default function RecipeCard(props) {
  const { label, image, uri } = props.result;
  return (
      <a href= {`#recipes?recipeId=${uri.split('_')[1]}`}>
      <div className="img-container">
        <img src={image}></img>
      </div>
      <div className="title-container">
        <h3>{label}</h3>
        <i className="fas fa-plus-circle add-icon"></i>
      </div>
      </a>
  );
}
