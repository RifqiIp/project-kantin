const menusRepository = require("../repositories/menus.repository");

const getAllMenus = async () => {
  return await menusRepository.getAllMenus();
};

const getMenuById = async (id) => {
  const menu = await menusRepository.getMenuById(id);

  if (!menu) {
    throw new Error("Menu not found");
  }

  return menu;
};

const createMenu = async (data) => {
  if (!data.name || !data.price) {
    throw new Error("Nama dan price wajib diisi");
  }

  if (data.price <= 0) {
    throw new Error("Price harus lebih dari 0");
  }

  if (data.qty !== undefined && data.qty < 0) {
    throw new Error("Qty tidak boleh kurang dari 0");
  }

  const existingMenu = await menusRepository.getMenuByName(data.name);
  if (existingMenu) {
    throw new Error("Menu dengan nama tersebut sudah ada");
  }

  return await menusRepository.createMenu(data);
};

const updateMenu = async (id, data) => {
  const existing = await menusRepository.getMenuById(id);
  if (!existing) {
    throw new Error("Menu not found");
  }

  if (data.name) {
    const duplicate = await menusRepository.getMenuByName(data.name);
    if (duplicate && duplicate.id !== id) {
      throw new Error("Nama menu sudah digunakan");
    }
  }

  return await menusRepository.updateMenu(id, {
    name: data.name ?? existing.name,
    price: data.price ?? existing.price,
    type: data.type ?? existing.type,
  });
};

module.exports = {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
};
