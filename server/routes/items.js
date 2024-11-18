const express = require("express");
const { Item } = require("../models");
const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  const items = await Item.findAll();
  res.send(items);
});

router.get("/:id", async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  res.send(item);
});

module.exports = router;
