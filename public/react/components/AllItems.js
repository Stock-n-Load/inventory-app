import React, { useState, useEffect } from "react";

// Prepend the API URL to any fetch calls.
import apiURL from "../api";

function AllItems({ setView }) {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("../api/");
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.log(`Error fetching data: ${err}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>View All Items</h1>
      <button onClick={() => setView(3)}>Create Item</button>
      <button onClick={() => setView(2)}>View Single Item</button>
      {items &&
        items.map((item) => (
          <div className="card">
            <img src="..." className="card-img-top" alt="item image" />
            <div className="card-body">
              <h5 className="card-title">Item Name</h5>
              <h5 className="card-title">Item Price</h5>
            </div>
          </div>
        ))}
    </>
  );
}

export default AllItems;
