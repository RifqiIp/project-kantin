const express = require("express");
const controller = require("../controllers/menus.controller");

const router = express.Router();

router.get("/", controller.getMenus);
router.post("/", controller.createMenu);
router.get("/stats", controller.getMenuStats);

router.post("/:id/restock", controller.restockMenu);
router.post("/:id/updateQty", controller.updateQty);
router.post("/:id/sell", controller.sellMenu);
router.put("/:id/publish", controller.publishMenu);
router.put("/:id/inactive", controller.inactiveMenu);

// soft delete
router.put("/:id/archive", controller.archiveMenu);
// permanent delete (restricted)
router.delete("/:id/purge", controller.purgeMenu);

router.get("/:id", controller.getMenuById);
router.put("/:id", controller.updateMenu);

module.exports = router;
