const Inventory = require("../models/inventoryModel");


// CREATE INVENTORY ITEM
exports.createInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.create(req.body);

    res.status(201).json({
      message: "Inventory item created successfully",
      item,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// GET ALL INVENTORY ITEMS
exports.getInventoryItems = async (req, res) => {
  try {
    const items = await Inventory.find();

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// UPDATE INVENTORY ITEM
exports.updateInventoryItem = async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Inventory updated successfully",
      updatedItem,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// DELETE INVENTORY ITEM
exports.deleteInventoryItem = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Inventory item deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};