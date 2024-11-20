import React, { useState, useEffect } from "react";

import apiURL from "../api";

function SingleItem({ view, setView, activeItem, setActiveItem, fetchData }) {
  const [showModal, setShowModal] = useState(false);

  function handleModal() {
    setShowModal(!showModal);
  }

  function handleBackToAllItems() {
    fetchData();
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
    fetchData();
    setActiveItem([]);
    setView(1);
  }

  return (
    <>
      <h1>Single Item</h1>
      <button onClick={() => handleBackToAllItems()}>Back</button>
      <button onClick={() => setView(4)}>Edit Item</button>
      <h2>{activeItem.name}</h2>
      <p>£{parseFloat(activeItem.price).toFixed(2)}</p>
      <img
        src={activeItem.image}
        className="card-img-top"
        alt="item image"
        style={{ width: "200px" }}
      />
      <p>{activeItem.description}</p>
      <p>{activeItem.category}</p>
      {console.log(activeItem)}

      {/* Button to trigger modal */}
      <button type="button" className="btn btn-danger" onClick={handleModal}>
        Delete
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex={-1}
          role="dialog"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                Are you sure you want to delete this?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteItem()}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleItem;
