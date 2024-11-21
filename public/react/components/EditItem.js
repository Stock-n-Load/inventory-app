import React, { useState, useEffect } from "react";
import apiURL from "../api";
import "./EditItem.css";
import logo from "../images/stock-n-load-logo.png";

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

  const handleDescriptionChange = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setDescription(e.target.value);
  };

  useEffect(() => {
    const textarea = document.getElementById("description-textarea");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [activeItem, description]);

  return (
    <>
      <div className="navBar">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
          <h1 className="logo-title">Stock-N-Load</h1>
        </div>
        <div className="d-flex justify-content-end back-btn-container">
          <button
            type="button"
            className="btn btn-secondary back-btn rounded-5 btn-sm"
            onClick={() => setView(1)}
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span className="backbtn-text ms-4">Back</span>
          </button>
        </div>
      </div>

      <form className="SubmissionForm" onSubmit={handleSubmit}>
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
              onChange={handleDescriptionChange}
            ></textarea>
          </li>
        </ol>
        <button className="submit" type="submit">
          Update
        </button>
      </form>
    </>
  );
}

export default EditItem;
