const Cafetaria = require("../cafetaria");

const cafe = new Cafetaria("Warung Sedap");

exports.getMenus = (req, res) => {
  const result = cafe.searchMenu(req.query);
  res.json(result);
};

exports.addMenu = (req, res) => {
  try {
    const result = cafe.addMenu(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.restockMenu = (req, res) => {
  try {
    const id = Number(req.params.id);
    const { qty } = req.body;

    const result = cafe.restockMenu(id, qty);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.sellMenu = (req, res) => {
  try {
    const id = Number(req.params.id);
    const { qty } = req.body;

    const result = cafe.sellMenu(id, qty);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getMenuById = (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = cafe.findMenuById(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateMenu = (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = cafe.updateMenu(id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteMenu = (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = cafe.deleteMenu(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
