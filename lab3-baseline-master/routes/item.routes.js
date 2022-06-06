// potrebno napisati
var express = require("express");
var router = express.Router();
const db = require("../db");

router.get("/:id([0-9]{1,10})", async function (req, res, next) {
  let id = parseInt(req.params.id);
  let query_result = await db.query("SELECT * FROM inventory");
  let items = query_result.rows;
  let item;

  for (let i of items) {
    if (i.id === id) {
      item = i;
      break;
    }
  }

  if (item) {
    query_result = await db.query("SELECT * FROM categories");
    let categories = query_result.rows;

    let category = categories.find((el) => {
      return el.id == item.categoryid;
    });

    res.render("item", {
      linkActive: "order",
      title: item.name,
      product: item,
      category: category,
    });
  } else {
    res.status(404).send("Are you guessing?");
  }
});

module.exports = router;
