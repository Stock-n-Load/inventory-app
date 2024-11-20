import React, { useState } from "react";
import apiURL from "../api";
function CreateItem({ setView, setActiveItem, fetchData }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [posted, setPosted] = useState(false);

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
      } else {
        console.error("Failed to create item.");
        setView(3)
      }
    } catch (error) {
      console.error("Error posting item:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    postItem(name, price, category, imgurl, description);
    fetchData();
    setView(2);
  }

  return (
    <>
      <button onClick={() => setView(1)}>Back</button>
      <h1>Create Item</h1>

      {loading && <p>Loading...</p>}
      {posted && <p>Item successfully created!</p>}

      <form onSubmit={handleSubmit}>
        <ol>
          <li>Name
            <textarea
              className="NewItemForm"
              placeholder="Your Items Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            ></textarea>
          </li>
          <li>Price
            <textarea
              className="NewItemForm"
              placeholder="Must be Numbers only"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
            ></textarea>
          </li>
          <li>Category
            <textarea
              className="NewItemForm"
              placeholder="e.g Electonics, Clothing..."
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
            ></textarea>
          </li>
          <li>Image Url
            <textarea
              className="NewItemForm"
              placeholder="Must be a URL format"
              value={imgurl}
              required
              onChange={(e) => setImgurl(e.target.value)}
            ></textarea>
          </li>
          <li>Description
            <textarea
              className="NewItemForm"
              placeholder="Minimum 10 Characters"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </li>
        </ol>
        <button type="submit" disabled={loading}>
          Submit Form
        </button>
      </form>
    </>
  );
}

export default CreateItem;
