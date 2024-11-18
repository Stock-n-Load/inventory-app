import React, { useState, useEffect } from "react";

function CreateItem({ setView }) {
  return (
    <>
      <h1>Create Item</h1>
      <button onClick={() => setView(2)}>Submit Form</button>
      <button onClick={() => setView(1)}>Back Button</button>
    </>
  );
}

export default CreateItem;
