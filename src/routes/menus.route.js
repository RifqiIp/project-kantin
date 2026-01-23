const express = require("express");
const controller = require("../controllers/menus.controller");

const router = express.Router();

router.get("/", controller.getMenus);
router.post("/", controller.addMenu);

router.post("/:id/restock", controller.restockMenu);
router.post("/:id/sell", controller.sellMenu);

router.get("/:id", controller.getMenuById);
router.put("/:id", controller.updateMenu);
router.delete("/:id", controller.deleteMenu);

module.exports = router;
