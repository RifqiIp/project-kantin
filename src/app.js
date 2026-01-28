const express = require("express");
const app = express();
const menusRoute = require("./routes/menus.route");

app.use(express.json());

app.use("/menus", menusRoute);

app.get("/", (req, res) => {
  console.log("Root endpoint hit");
  res.send("Server Kantin Running");
});

module.exports = app;

/**
 * ❌ DULU route ditulis langsung di app.js
 * app.get("/menus", ...)
 *
 * ✅ SEKARANG dipindah ke:
 * routes/menus.route.js
 * dan dipasang lewat:
 * app.use("/menus", menusRoute)
 */

// route menus
// app.get("/menus", (req, res) => {
//   const result = cafe.searchMenu(req.query);
//   res.status(200).json(result);
// });

// app.post("/menus", (req, res) => {
//   try {
//     const result = cafe.addMenu(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// app.post("/menus/:id/restock", (req, res) => {
//   try {
//     const id = Number(req.params.id);
//     const { qty } = req.body;

//     const result = cafe.restockMenu(id, qty);
//     res.status(201).json(result);
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// app.post("/menus/:id/sell", (req, res) => {
//   try {
//     const id = Number(req.params.id);
//     const { qty } = req.body;

//     const result = cafe.sellMenu(id, qty);
//     res.status(201).json(result);
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// app.get("/menus/:id", (req, res) => {
//   try {
//     const id = Number(req.params.id);
//     const result = cafe.findMenuById(id);

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// app.put("/menus/:id", (req, res) => {
//   try {
//     const id = Number(req.params.id);
//     const data = req.body;

//     const result = cafe.updateMenu(id, data);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// app.delete("/menus/:id", (req, res) => {
//   try {
//     const id = Number(req.params.id);
//     const result = cafe.deleteMenu(id);
//     res.status(201).json(result);
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });
