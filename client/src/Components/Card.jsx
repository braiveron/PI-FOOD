import React from "react";

export default function RecipeCard({ title, image, typeDiets, healthScore }) {
  return (
    <div>
      <h3>{title}</h3>
      <img src={image} alt="img not found" width="200px" height="250px" />
      <h5>{typeDiets}</h5>
      <h5>{healthScore}</h5>
    </div>
  );
}
