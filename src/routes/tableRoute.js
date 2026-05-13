const express = require("express");
const router = express.Router();

const {createTable,getTables,updateTableStatus,} = require("../controllers/tableController");

router.post("/table", createTable);

router.get("/table", getTables);

router.patch("/table:id", updateTableStatus);

module.exports = router;