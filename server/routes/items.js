const express = require("express");
const { Item } = require("../models");
const router = express.Router();

router.use(express.json());

router.get('/' , async (req, res) => {
    const items = await Item.findAll()
    res.send(items)
})

router.get("/:id", async (req, res) => {
    const item = await Item.findByPk(req.params.id)
    res.send(item)
})

router.post('/new', async (req, res) => {
    const { name, description, price, category, image } = req.body;  
    const newItem = await Item.create({
      name,
      description,
      price,
      category,
      image,
    });  
    res.status(201).json(newItem); 
});

module.exports = router;
