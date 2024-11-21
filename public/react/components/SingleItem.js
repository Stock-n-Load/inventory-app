import React, { useState, useEffect } from "react";
import apiURL from "../api";
import './SingelItem.css'

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
    <div className="button-top-right-2">
      <button type="button" class="btn btn-secondary" onClick={() => handleBackToAllItems()}>Back</button>
    </div>
      <div className="Single-card-2">
      <h2>{activeItem.name}</h2>
      <h3>£{parseFloat(activeItem.price).toFixed(2)}</h3>
      <div className="img-box-2">
      <img
        src={activeItem.image}
        className="card-img-top-2"
        alt="item image"
      />
      </div>
      <h3>Description</h3>
      <p>{activeItem.description}</p>
      <h3>Category</h3>
      <p>{activeItem.category}</p>
      {console.log(activeItem)}

      <button type="button" class="btn btn-success" onClick={() => setView(4)}>
      <i class="fas fa-edit"></i>

      </button>
      <button type="button" className="btn btn-danger" onClick={handleModal}>
        Delete
      </button>

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
      </div>
    </>
  );
}

export default SingleItem;