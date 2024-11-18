const express = require("express");
const { Item } = require("../models");
const router = express.Router();

router.use(express.json());

router.get('/' , async (req, res) => {
    const items = await Item.findAll()
    res.send(items)
})


module.exports = router;
