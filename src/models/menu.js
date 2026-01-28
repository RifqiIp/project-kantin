// // src/models/menu.js
// const pool = require("../config/connection");
// const STATUS = require("../constants/status");

// async function getAllMenus() {
//   const result = await pool.query(
//     "SELECT * FROM menus ORDER BY created_at DESC",
//   );
//   return result.rows;
// }

// async function addMenu({ id, name, price, type, qty, status = STATUS.DRAFT }) {
//   const result = await pool.query(
//     `INSERT INTO menus (id, name, price, type, qty, status)
//      VALUES ($1, $2, $3, $4, $5, $6)
//      RETURNING *`,
//     [id, name, price, type, qty, status],
//   );
//   return result.rows[0];
// }

// module.exports = { getAllMenus, addMenu };
