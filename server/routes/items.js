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

router.delete('/:id', async (req,res)=>{
    const item = await Item.findByPk(req.params.id)
    await item.destroy()
    res.status(204).send('Item Destroyed')
})

router.put("/:id", async (req,res) =>{
    await Item.update(req.body, {
        where : {id: req.params.id}
    });
    const updatedItem  = await Item.findByPk(req.params.id)
    res.status(202).send(updatedItem)
})

module.exports = router;
