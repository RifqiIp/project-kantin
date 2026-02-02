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

const deleteMenuPermanently = async (id) => {
  const result = await db.query(`DELETE FROM menus WHERE id = $1 RETURNING *`, [
    id,
  ]);

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

const sellMenu = async (id, qty) => {
  const result = await db.query(
    `UPDATE menus SET qty = qty - $1, sold_qty = sold_qty + $1 WHERE id = $2 AND qty >= $1 RETURNING *`,
    [qty, id],
  );

  return result.rows[0];
};

updateStatus = async (id, status) => {
  const result = await db.query(
    `UPDATE menus SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id],
  );
  return result.rows[0];
};

const getMenuStats = async () => {
  // summary stats
  const summary = await db.query(`
    SELECT
      COUNT(*) AS total_menu,
      COALESCE(SUM(sold_qty * price), 0) AS total_revenue,
      COALESCE(MAX(price), 0) AS highest_price,
      COALESCE(MIN(price), 0) AS lowest_price
    FROM menus
    WHERE status = 'published'
  `);

  // top selling menu
  const topSelling = await db.query(`
    SELECT id, name, sold_qty
    FROM menus
    WHERE sold_qty > 0
    ORDER BY sold_qty DESC
    LIMIT 1
  `);

  return {
    total_menu: Number(summary.rows[0].total_menu),
    total_revenue: Number(summary.rows[0].total_revenue),
    highest_price: Number(summary.rows[0].highest_price),
    lowest_price: Number(summary.rows[0].lowest_price),
    top_selling: topSelling.rows[0] || null,
  };
};

module.exports = {
  getAllMenus,
  getMenuById,
  createMenu,
  getMenuByName,
  updateMenu,
  deleteMenuPermanently,
  restockMenu,
  updateQty,
  sellMenu,
  updateStatus,
  getMenuStats,
};
