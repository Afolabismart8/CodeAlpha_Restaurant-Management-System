const Table = require("../models/tableModel");

exports.createTable = async (req, res) => {
  try {
    const { tableNumber, capacity } = req.body;

    // 1. CHECK FIRST (BEFORE CREATE)
    const existingTable = await Table.findOne({ tableNumber: req.body.tableNumber });

    if (existingTable) {
      return res.status(409).json({
        message: "Table has already been booked",
      });
    }

    // 2. CREATE ONLY IF SAFE
    const table = await Table.create({
      tableNumber,
      capacity,
    });

    res.status(201).json({
      message: "Table created successfully",
      table,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// GET ALL TABLES
exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find();

    res.status(200).json(tables);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// UPDATE TABLE STATUS
exports.updateTableStatus = async (req, res) => {
  try {
    const table = await Table.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Table updated successfully",
      table,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};