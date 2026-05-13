const Order = require("../models/orderModel");
const Menu = require("../models/menuModel");
const Inventory = require("../models/inventoryModel");


// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { customerName, items } = req.body;

    let totalAmount = 0;

    // LOOP THROUGH ORDER ITEMS
    for (const item of items) {

      // FIND MENU ITEM + INGREDIENTS
      const menuItem = await Menu.findById(item.menuItem)
        .populate("ingredients.inventoryItem");

      if (!menuItem) {
        return res.status(404).json({
          message: "Menu item not found",
        });
      }

      // CHECK INVENTORY
      for (const ingredient of menuItem.ingredients) {

        const inventoryItem = ingredient.inventoryItem;

        const requiredQuantity =
          ingredient.quantityRequired * item.quantity;

       // INSUFFICIENT STOCK
        if (inventoryItem.quantity < requiredQuantity) {
          return res.status(400).json({
            message: `Not enough ${inventoryItem.itemName} in stock`,
          });
        }

      // REDUCE INVENTORY
        inventoryItem.quantity -= requiredQuantity;

        await inventoryItem.save();
      }

      // SET ITEM PRICE
      item.price = menuItem.price;

      // CALCULATE TOTAL
      totalAmount += menuItem.price * item.quantity;
    }

    // CREATE ORDER
    const order = await Order.create({
      customerName,
      items,
      totalAmount,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};