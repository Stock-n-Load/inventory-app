import React, { useState } from "react";
import apiURL from "../api";
import "./FormItem.css";
import logo from "../images/stock-n-load-logo.png";

function CreateItem({ setView, setActiveItem, fetchData }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [posted, setPosted] = useState(false);
  const [errors, setErrors] = useState({});

  async function postItem(name, price, category, imgurl, description) {
    setLoading(true);
    try {
      const response = await fetch(`${apiURL}/items/new`, {
        method: "POST",
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

      if (response.status === 201) {
        setPosted(true);
        const data = await response.json();
        setActiveItem(data);
        return true;
      } else if (response.status === 400) {
        const errorData = await response.json();
        handleErrors(errorData.errors);
      }
    } catch (error) {
      console.error("Error posting item:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleErrors(errorArray) {
    const formattedErrors = errorArray.reduce((acc, error) => {
      acc[error.path] = error.msg;
      return acc;
    }, {});
    setErrors(formattedErrors);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const posted = await postItem(name, price, category, imgurl, description);
    if (posted) {
      fetchData();
      setView(2);
    }
  }

  const handleDescriptionChange = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setImgurl(e.target.value);
  };

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
      <h2 className="formHeader">Create Item</h2>
      {loading && <p className="status">Loading...</p>}
      {posted && <p className="status">Item successfully created!</p>}
      <div className="d-flex justify-content-center">
        <form className="SubmissionForm" onSubmit={handleSubmit}>
          <ol className="fieldContainer p-0">
            <li>
              <label for="createName">Name</label>
              <textarea
                id="createName"
                className="NewItemForm"
                placeholder="Your Item's Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></textarea>
              {errors.name && <span className="error-text">{errors.name}</span>}
            </li>
            <li>
              <label for="createPrice">Price</label>
              <textarea
                id="createPrice"
                className="NewItemForm"
                placeholder="Must be Numbers only"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></textarea>
              {errors.price && (
                <span className="error-text">{errors.price}</span>
              )}
            </li>
            <li>
              <label for="createCategory">Category</label>
              <textarea
                id="createCategory"
                className="NewItemForm"
                placeholder="e.g Tires, Motor Oil..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></textarea>
              {errors.category && (
                <span className="error-text">{errors.category}</span>
              )}
            </li>
            <li>
              <label for="createImageUrl">Image URL</label>
              <textarea
                id="createImageUrl"
                className="NewItemForm"
                placeholder="Must be a URL format"
                value={imgurl}
                onChange={handleImageChange}
              ></textarea>
              {errors.image && (
                <span className="error-text">{errors.image}</span>
              )}
            </li>
            <li>
              <label for="createDescription">Description</label>
              <textarea
                id="createDescription"
                className="NewItemForm"
                placeholder="Must be between 10-1000 Characters"
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
              {errors.description && (
                <span className="error-text">{errors.description}</span>
              )}
            </li>
          </ol>
          <button className="submit" type="submit" disabled={loading}>
            Add Item
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateItem;
