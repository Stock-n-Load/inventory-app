import React, { useState, useEffect } from "react";

import apiURL from "../api";

function SingleItem({ view, setView, activeItem, setActiveItem, fetchData }) {
  function handleBackToAllItems() {
    fetchData();
    setView(1);
    setActiveItem([]);
  }

  async function handleDeleteItem() {
    try {
      const response = await fetch(`${apiURL}/items/${activeItem.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(`Error message: ${error}`);
    }
    fetchData();
    setActiveItem([]);
    setView(1);
  }

  return (
    <>
      <h1>Single Item</h1>
      <button onClick={() => handleBackToAllItems()}>Back</button>
      <button onClick={() => setView(4)}>Edit Item</button>
      <button onClick={() => handleDeleteItem()}>Delete Item</button>
      <h2>{activeItem.name}</h2>
      <p>£{parseFloat(activeItem.price).toFixed(2)}</p>
      <img
        src={activeItem.image}
        className="card-img-top"
        alt="item image"
        style={{ width: "200px" }}
      />
      <p>{activeItem.description}</p>
      <p>{activeItem.category}</p>
      {console.log(activeItem)}
    </>
  );
}

export default SingleItem;
