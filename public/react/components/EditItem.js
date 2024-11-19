import React, { useState, useEffect } from "react";
import apiURL from "../api";

function EditItem({ setView, activeItem, setActiveItem, fetchData }) {
  // Initialize state with active item values if available
  const [name, setName] = useState(activeItem?.name || "");
  const [price, setPrice] = useState(activeItem?.price || "");
  const [category, setCategory] = useState(activeItem?.category || "");
  const [imgurl, setImgurl] = useState(activeItem?.image || "");
  const [description, setDescription] = useState(activeItem?.description || "");

  // Function to send PUT request to update the item
  async function updateItem(id, name, price, category, imgurl, description) {
    const response = await fetch(`${apiURL}/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        price: price,
        category: category,
        image: imgurl,
        description: description,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Item updated successfully:", data);

      // Set the active item with updated data
      setActiveItem(data);

      // Redirect to view 2 after successful update
      await fetchData();
      setView(2);
    } else {
      console.error("Failed to update item:", response.statusText);
    }
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Call the updateItem function with the active item ID and new data
    updateItem(activeItem.id, name, price, category, imgurl, description);
  }

  return (
    <>
      <button onClick={() => setView(1)}>Back</button>
      <h1>Edit Item</h1>
      <form onSubmit={handleSubmit}>
        <ol>
          <li>
            <textarea
              className="NewItemForm"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></textarea>
          </li>
          <li>
            <textarea
              className="NewItemForm"
              placeholder="Price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></textarea>
          </li>
          <li>
            <textarea
              className="NewItemForm"
              placeholder="Category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></textarea>
          </li>
          <li>
            <textarea
              className="NewItemForm"
              placeholder="Image Url"
              required
              value={imgurl}
              onChange={(e) => setImgurl(e.target.value)}
            ></textarea>
          </li>
          <li>
            <textarea
              className="NewItemForm"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </li>
        </ol>
        <button type="submit">Submit Form</button>
        <button onClick={() => setView(2)}>Back Button</button>
      </form>
    </>
  );
}

export default EditItem;
