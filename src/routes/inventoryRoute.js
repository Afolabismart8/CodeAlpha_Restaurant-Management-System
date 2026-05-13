const express = require("express");
const router = express.Router();

const {createInventoryItem,getInventoryItems,updateInventoryItem,deleteInventoryItem} = require("../controllers/inventoryController");


// CREATE
router.post("/inventory", createInventoryItem);

// GET ALL
router.get("/inventory", getInventoryItems);

// UPDATE
router.patch("/inventory/:id", updateInventoryItem);

// DELETE
router.delete("/inventory/:id", deleteInventoryItem);

module.exports = router;