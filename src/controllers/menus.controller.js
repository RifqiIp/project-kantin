const menuService = require("../services/menus.service");

exports.getMenus = async (req, res) => {
  try {
    const menus = await menuService.getAllMenus(); // <-- panggil model
    res.json(menus); // kirim ke client
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getMenuById = async (req, res) => {
  try {
    const id = req.params.id;
    const menu = await menuService.getMenuById(id);

    res.json(menu);
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
    const menu = await menuService.updateMenu(req.params.id, req.body);
    res.json({ success: true, data: menu });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.restockMenu = async (req, res) => {
  try {
    const { qty } = req.body;
    const menu = await menuService.restockMenu(req.params.id, qty);

    res.json({ success: true, data: menu });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateQty = async (req, res) => {
  try {
    const { qty } = req.body;
    const menu = await menuService.updateQty(req.params.id, qty);

    res.json({ success: true, data: menu });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// exports.restockMenu = (req, res) => {
//   try {
//     const id = Number(req.params.id);
//     const { qty } = req.body;

//     const result = cafe.restockMenu(id, qty);
//     res.status(201).json(result);
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// exports.sellMenu = (req, res) => {
//   try {
//     const id = Number(req.params.id);
//     const { qty } = req.body;

//     const result = cafe.sellMenu(id, qty);
//     res.status(201).json(result);
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// exports.getMenuById = (req, res) => {
//   try {
//     const id = Number(req.params.id);
//     const result = cafe.findMenuById(id);
//     res.json(result);
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// exports.updateMenu = (req, res) => {
//   try {
//     const id = Number(req.params.id);
//     const result = cafe.updateMenu(id, req.body);
//     res.json(result);
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// exports.deleteMenu = (req, res) => {
//   try {
//     const id = Number(req.params.id);
//     const result = cafe.deleteMenu(id);
//     res.json(result);
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };
