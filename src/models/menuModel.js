const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description:{ type: String },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      enum: ["food", "drink", "dessert"],
      required: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
    ingredients: [
  {
    inventoryItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
    },
    quantityRequired: Number,
  },
],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Menu", menuSchema);