import React, { useState, useEffect } from "react";

// Prepend the API URL to any fetch calls.
import apiURL from "../api";

function AllItems({ setView }) {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiURL}/items`);
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
      {console.log(items)}
      <h1>View All Items</h1>
      <button onClick={() => setView(3)}>Create Item</button>
      <button onClick={() => setView(2)}>View Single Item</button>
      {items &&
        items.map((item) => (
          <div className="card" key={item.name}>
            <img
              src={item.image}
              className="card-img-top"
              alt="item image"
              style={{ width: "200px" }}
            />
            <div className="card-body">
              <h5 className="card-title">
                <strong>{item.name}</strong>
              </h5>
              <h5 className="card-title">£{item.price.toFixed(2)}</h5>
            </div>
          </div>
        ))}
    </>
  );
}

export default AllItems;
