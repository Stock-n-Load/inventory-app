import React, { useState, useEffect } from "react";

import apiURL from "../api";

function SingleItem({ setView, activeItem, setActiveItem }) {
  function handleBackToAllItems() {
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
      <p>£{activeItem.price.toFixed(2)}</p>
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

// const deleteItem = (id) => {
//   // URL of the API endpoint
//   const url = `https://api.example.com/items/${id}`;

//   // Use fetch to make the DELETE request
//   fetch(url, {
//     method: 'DELETE', // HTTP method is DELETE
//     headers: {
//       'Content-Type': 'application/json', // Set content type if necessary
//       // Add Authorization headers if required, e.g., Bearer token
//       // 'Authorization': `Bearer ${yourToken}`,
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Failed to delete item');
//       }
//       return response.json(); // Parse the response body (if needed)
//     })
//     .then((data) => {
//       console.log('Item deleted:', data);
//       // You can update your state here, e.g., by removing the item from the list
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// };
