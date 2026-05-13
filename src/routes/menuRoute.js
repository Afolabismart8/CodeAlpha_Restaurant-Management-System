const express = require("express");
const router = express.Router();

const {createMenuItem,getMenuItems,} = require("../controllers/menuController");

router.post("/menu", createMenuItem);
router.get("/menu", getMenuItems);

module.exports = router;