const express = require("express");
const { Item } = require("../models");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.use(express.json());

router.get("/", async (req, res) => {
  const items = await Item.findAll();
  res.send(items);
});

router.get("/:id", async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  res.send(item);
});

router.post(
  "/new",
  [
    body("name").notEmpty().withMessage("Name is required."),
    body("description")
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long."),
    body("price").isNumeric().withMessage("Price must be a valid number."),
    body("category").notEmpty().withMessage("Category is required."),
    body("image").isURL().withMessage("Image must be a valid URL."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price, category, image } = req.body;

    const newItem = await Item.create({
      name,
      description,
      price,
      category,
      image,
    });

    res.status(201).send(newItem);
  }
);

router.delete("/:id", async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  await item.destroy();
  res.status(204).send("Item Destroyed");
});

router.put("/:id", async (req, res) => {
  await Item.update(req.body, {
    where: { id: req.params.id },
  });
  const updatedItem = await Item.findByPk(req.params.id);
  res.status(202).send(updatedItem);
});

module.exports = router;
