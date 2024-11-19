import React, { useState, useEffect } from "react";
import apiURL from "../api";

function CreateItem({ setView }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [description, setDescription] = useState("");

  async function postItem(name,price,category,imgurl,description) {
    console.log(apiURL)
    const response = await fetch(`${apiURL}/items/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        price: price,
        category: category,
        image: imgurl,
        description: description,
      }),
    });
    console.log(response)
  }

  function handleSubmit(e) {
    e.preventDefault();
    postItem(name,price,category,imgurl,description)

  }
  return (
    <>
      <button onClick={() => setView(1)}>Back</button>
      <h1>Create Item</h1>
      <form onSubmit={handleSubmit}>
        <ol>
          <li>
            <textarea
              className="NewItemForm"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            ></textarea>
          </li>
          <li>
            <textarea
              className="NewItemForm"
              placeholder="Price"
              required
              onChange={(e) => setPrice(e.target.value)}
            ></textarea>
          </li>
          <li>
            <textarea
              className="NewItemForm"
              placeholder="Category"
              required
              onChange={(e) => setCategory(e.target.value)}
            ></textarea>
          </li>
          <li>
            <textarea
              className="NewItemForm"
              placeholder="Image Url"
              required
              onChange={(e) => setImgurl(e.target.value)}
            ></textarea>
          </li>
          <li>
            <textarea
              className="NewItemForm"
              placeholder="Description"
              required
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </li>
        </ol>
        <button type="submit">Submit Form</button>
      </form>
    </>
  );
}
/* name
   price
   Category
   imgurl
   Desc
  */
export default CreateItem;
