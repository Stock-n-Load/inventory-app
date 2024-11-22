import React, { useState } from "react";
import apiURL from "../api";
import "./CreateItem.css";
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
        console.log("Item created successfully!");
        const data = await response.json();
        await new Promise((resolve) => setTimeout(resolve, 100));
        setActiveItem(data);
        console.log(data);
        return true
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

      <h2 className="createHeader">Create Item</h2>
      {loading && <p className="status">Loading...</p>}
      {posted && <p className="status">Item successfully created!</p>}
      <form className="SubmissionForm" onSubmit={handleSubmit}>
        <ol className="p-0">
          <li>
            Name
            <textarea
              className="NewItemForm"
              placeholder="Your Items Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></textarea>
            {errors.name && <p className="error-text">{errors.name}</p>}
          </li>
          <li>
            Price
            <textarea
              className="NewItemForm"
              placeholder="Must be Numbers only"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></textarea>
            {errors.price && <p className="error-text">{errors.price}</p>}
          </li>
          
          <li>
            Category
            <textarea
              className="NewItemForm"
              placeholder="e.g Tires, Motor Oil..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></textarea>
            {errors.category && <p className="error-text">{errors.category}</p>}
          </li>
          <li>
            Image Url
            <textarea
              className="NewItemForm"
              placeholder="Must be a URL format"
              value={imgurl}
              onChange={handleImageChange}
            ></textarea>
            {errors.image && <p className="error-text">{errors.image}</p>}
          </li>
          <li>
            Description
            <textarea
              className="NewItemForm"
              placeholder="Must be between 10-1000 Characters"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
            {errors.description && <p className="error-text">{errors.description}</p>}
          </li>
        </ol>
        <button className="submit m-0" type="submit" disabled={loading}>
          Add Item
        </button>
      </form>
    </>
  );
}

export default CreateItem;
