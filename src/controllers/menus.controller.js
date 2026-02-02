const menuService = require("../services/menus.service");

exports.getMenus = async (req, res) => {
  try {
    const menus = await menuService.getAllMenus(); // <-- panggil model

    res.status(200).json({ success: true, data: menus });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getMenuById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const menu = await menuService.getMenuById(id);

    res.status(200).json({ success: true, data: menu });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

exports.createMenu = async (req, res) => {
  try {
    const menu = await menuService.createMenu(req.body); // panggil model

    res.status(201).json({ success: true, data: menu });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const menu = await menuService.updateMenu(id, req.body);

    res.status(200).json({ success: true, data: menu });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.purgeMenu = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const menu = await menuService.purgeMenu(id);
    res.status(200).json({ success: true, data: menu });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.restockMenu = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { qty } = req.body;
    const menu = await menuService.restockMenu(id, qty);

    res.status(200).json({ success: true, data: menu });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateQty = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { qty } = req.body;
    const menu = await menuService.updateQty(id, qty);

    res.status(200).json({ success: true, data: menu });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.sellMenu = async (req, res) => {
  try {
    const { qty } = req.body;
    const menu = await menuService.sellMenu(req.params.id, qty);

    res.status(200).json({ success: true, data: menu });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.publishMenu = async (req, res) => {
  try {
    const menu = await menuService.publishMenu(req.params.id);

    res.status(200).json({ success: true, data: menu });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.inactiveMenu = async (req, res) => {
  try {
    const menu = await menuService.inactiveMenu(req.params.id);

    res.status(200).json({ success: true, data: menu });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.archiveMenu = async (req, res) => {
  try {
    const menu = await menuService.archiveMenu(req.params.id);

    res.status(200).json({ success: true, data: menu });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getMenuStats = async (req, res) => {
  try {
    const stats = await menuService.getMenuStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
