import React, { useState, useEffect } from "react";

function CreateItem({ setView }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [description, setDescription] = useState("");

  async function postItem(name,price,category,imgurl,description) {
    const response = await fetch(`${apiURL}/new`, {
      method: "POST",
      body: {
        name: name,
        price: price,
        category: category,
        imgurl: imgurl,
        description: description,
      },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setName(name);
    setPrice(price);
    setCategory(category);
    setImgurl(imgurl);
    setDescription(description)
    postItem()

  }
  return (
    <>
      <button onClick={() => setView(1)}>Back</button>
      <h1>Create Item</h1>
      <form>
        <ol>
          <li>
            <textarea
              className="NewItemForm"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            ></textarea>
          </li>
          <li>
            <textarea
              className="NewItemForm"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            ></textarea>
          </li>
          <li>
            <textarea
              className="NewItemForm"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            ></textarea>
          </li>
          <li>
            <textarea
              className="NewItemForm"
              placeholder="Image Url"
              onChange={(e) => setImgurl(e.target.value)}
            ></textarea>
          </li>
          <li>
            <textarea
              className="NewItemForm"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </li>
        </ol>
        <button onClick={() => setView(2)}>Submit Form</button>
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
