import React, { useEffect, useState } from "react";
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
  const [items, setItems] = useState([]);

  const [view, setView] = useState(() => {
    const savedView = localStorage.getItem("view");
    return savedView ? Number(savedView) : ALL_ITEM_VIEW;
  });

  const [activeItem, setActiveItem] = useState(() => {
    const savedActiveItem = localStorage.getItem("activeItem");
    return savedActiveItem ? JSON.parse(savedActiveItem) : null;
  });

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

  useEffect(() => {
    localStorage.setItem("view", view);
  }, [view]);

  useEffect(() => {
    localStorage.setItem("activeItem", JSON.stringify(activeItem));
  }, [activeItem]);

  return view === ALL_ITEM_VIEW ? (
    <AllItems
      view={view}
      setView={setView}
      items={items}
      setActiveItem={setActiveItem}
    />
  ) : view === SINGLE_ITEM_VIEW ? (
    <SingleItem
      view={view}
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
