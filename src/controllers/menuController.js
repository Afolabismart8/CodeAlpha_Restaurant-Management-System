const Menu = require("../models/menuModel");

// CREATE MENU ITEM
exports.createMenuItem = async (req, res) => {
  try {
    const item = await Menu.create(req.body);

    res.status(201).json({
      message: "Menu item created",
      item,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL MENU ITEMS
exports.getMenuItems = async (req, res) => {
  try {
    const items = await Menu.find();

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};