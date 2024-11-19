import React, { useState, useEffect } from "react";

function EditItem({ setView }) {
  return (
    <>
      <h1>Create Item</h1>
      <button onClick={() => setView(2)}>Update Button</button>
      <button onClick={() => setView(2)}>Back Button</button>
    </>
  );
}

export default EditItem;
