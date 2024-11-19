import React, { useState, useEffect } from "react";

function SingleItem({ setView }) {
  return (
    <>
      <h1>Single Item</h1>
      <button onClick={() => setView(1)}>Back</button>
      <button onClick={() => setView(4)}>Edit Item</button>
      <button onClick={() => setView(1)}>Delete Item</button>
    </>
  );
}

export default SingleItem;
