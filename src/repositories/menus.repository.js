const db = require("../config/db");

const getAllMenus = async () => {
  const result = await db.query("SELECT * FROM menus ORDER BY created_at DESC");
  return result.rows;
};

const getMenuById = async (id) => {
  const result = await db.query("SELECT * FROM menus WHERE id = $1", [id]);
  return result.rows[0];
};

const createMenu = async (menu) => {
  const { name, price, type, qty, status } = menu;

  const result = await db.query(
    `INSERT INTO menus (name, price, type, qty, status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, price, type, qty ?? 0, status ?? "draft"],
  );

  return result.rows[0];
};

const getMenuByName = async (name) => {
  const result = await db.query("SELECT id FROM menus WHERE name = $1", [name]);
  return result.rows[0]; // undefined jika tidak ada
};

const updateMenu = async (id, data) => {
  const result = await db.query(
    `UPDATE menus SET name = $1, price = $2, type = $3 WHERE id = $4 RETURNING *`,
    [data.name, data.price, data.type, id],
  );

  return result.rows[0];
};

const restockMenu = async (id, qty) => {
  const result = await db.query(
    `UPDATE menus SET qty = qty + $1 where id = $2 RETURNING *`,
    [qty, id],
  );

  return result.rows[0];
};
const updateQty = async (id, qty) => {
  const result = await db.query(
    `UPDATE menus SET qty = $1 where id = $2 RETURNING *`,
    [qty, id],
  );

  return result.rows[0];
};

module.exports = {
  getAllMenus,
  getMenuById,
  createMenu,
  getMenuByName,
  updateMenu,
  restockMenu,
  updateQty,
};
