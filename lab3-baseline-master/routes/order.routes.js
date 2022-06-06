// potrebno napisati
const db = require("../db");
var express = require("express");
var router = express.Router();

//treba dohvatiti sve proizvode

router.get("/", async function (req, res, next) {
  let categories, inventory, result;
  result = await db.query("SELECT * FROM categories");
  categories = result.rows;
  result = await db.query("SELECT * FROM inventory");
  inventory = result.rows;

  res.render("order", {
    linkActive: "order",
    title: "Order",
    categories,
    inventory,
  });
});

module.exports = router;
