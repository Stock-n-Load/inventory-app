import React, { useEffect, useState } from "react";

// Prepend the API URL to any fetch calls.
import apiURL from "../api";

import AllItems from "./AllItems";
import SingleItem from "./SingleItem";
import CreateItem from "./CreateItem";
import EditItem from "./EditItem";

const ALL_ITEM_VIEW = 1;
const SINGLE_ITEM_VIEW = 2;
const CREATE_ITEM_VIEW = 3;
const EDIT_ITEM_VIEW = 4;

function App() {
  const [activeItem, setActiveItem] = useState([]);
  const [view, setView] = useState(ALL_ITEM_VIEW);

  return view === ALL_ITEM_VIEW ? (
    <AllItems setView={setView} setActiveItem={setActiveItem} />
  ) : view === SINGLE_ITEM_VIEW ? (
    <SingleItem
      setView={setView}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
    />
  ) : view === CREATE_ITEM_VIEW ? (
    <CreateItem setView={setView} />
  ) : view === EDIT_ITEM_VIEW ? (
    <EditItem setView={setView} />
  ) : (
    <>
      <h1>Error creating view</h1>
    </>
  );
}

export default App;
