// const pool = require("./connection");

// async function testConnection() {
//   try {
//     const res = await pool.query("SELECT NOW()");
//     console.log("DB Connected:", res.rows[0]);
//     process.exit(0);
//   } catch (err) {
//     console.error("DB Error:", err.message);
//     process.exit(1);
//   }
// }

// testConnection();

const pool = require("../config/db");

async function getAllMenus(req, res) {
  try {
    const result = await pool.query("SELECT * FROM menus");
    res.json(result.rows);
  } catch (err) {
    console.error("Query failed:", err.message);
    res.status(500).json({ error: "Failed to fetch menus" });
  }
}
