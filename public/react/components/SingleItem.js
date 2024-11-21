import React, { useState, useEffect } from "react";
import apiURL from "../api";
import "./SingelItem.css";
import logo from "../images/stock-n-load-logo.png";

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
      <div className={`modal-overlay ${showModal ? "show" : ""}`}></div>
      <div className="navBar">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
          <h1 className="logo-title">Stock-N-Load</h1>
        </div>
        <div className="d-flex justify-content-end back-btn-container">
          <button
            type="button"
            className="btn btn-secondary back-btn rounded-5 btn-sm"
            onClick={() => handleBackToAllItems()}
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span className="backbtn-text ms-4">Back</span>
          </button>
        </div>
      </div>

      <div className="Single-card-2">
        <strong>{activeItem.name}</strong>
        <h5>£{parseFloat(activeItem.price).toFixed(2)}</h5>
        <div className="img-box-2">
          <img
            src={activeItem.image}
            className="card-img-top-2"
            alt="item image"
          />
        </div>
        <div>
          <h5>Description</h5>
          <p className="ms-3 item-label-2">{activeItem.description}</p>
        </div>
        <div>
          <h5>Category</h5>
          <i className="ms-3 item-label-2">{activeItem.category}</i>
          {console.log(activeItem)}
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary rounded-circle"
            onClick={() => setView(4)}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            type="button"
            className="btn btn-danger rounded-circle ms-2"
            onClick={handleModal}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
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
