const menusRepository = require("../repositories/menus.repository");

const STATUS = require("../constants/status");

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

const purgeMenu = async (id) => {
  const menu = await menusRepository.getMenuById(id);
  if (!menu) throw new Error("Menu not found");

  if (menu.status === STATUS.PUBLISHED) {
    throw new Error("Published menu cannot be permanently deleted");
  }

  return await menusRepository.deleteMenuPermanently(id);
};

const restockMenu = async (id, qty) => {
  if (qty <= 0) throw new Error("Qty restock harus lebih dari 0");

  const menu = await menusRepository.getMenuById(id);
  if (!menu) throw new Error("Menu not found");

  return await menusRepository.restockMenu(id, qty);
};

const updateQty = async (id, qty) => {
  if (qty <= 0) throw new Error("Qty restock harus lebih dari 0");

  const menu = await menusRepository.getMenuById(id);
  if (!menu) throw new Error("Menu not found");

  return await menusRepository.updateQty(id, qty);
};

const sellMenu = async (id, qty) => {
  if (qty <= 0) {
    throw new Error("Quantity must be greater than zero");
  }

  const menu = await menusRepository.getMenuById(id);
  if (!menu) throw new Error("Menu not found");

  if ([STATUS.DRAFT, STATUS.ARCHIVED, STATUS.INACTIVE].includes(menu.status)) {
    throw new Error("Menu cannot be sold");
  }

  const updated = await menusRepository.sellMenu(id, qty);

  if (!updated) {
    throw new Error("Insufficient stock");
  }

  if (updated.qty === 0) {
    await menusRepository.updateStatus(id, STATUS.OUT_OF_STOCK);
  }

  return updated;
};

const publishMenu = async (id) => {
  const menu = await menusRepository.getMenuById(id);
  if (!menu) throw new Error("Menu not found");

  if (menu.status === STATUS.PUBLISHED) {
    throw new Error("Menu already published");
  }

  if ([STATUS.ARCHIVED].includes(menu.status)) {
    throw new Error("Archived menu cannot be published");
  }

  if (menu.qty <= 0) {
    throw new Error("Cannot publish menu with empty stock");
  }

  return await menusRepository.updateStatus(id, STATUS.PUBLISHED);
};

const inactiveMenu = async (id) => {
  const menu = await menusRepository.getMenuById(id);
  if (!menu) throw new Error("Menu not found");

  if (menu.status === STATUS.INACTIVE) {
    throw new Error("Menu already inactive");
  }

  return await menusRepository.updateStatus(id, STATUS.INACTIVE);
};

const archiveMenu = async (id) => {
  const menu = await menusRepository.getMenuById(id);
  if (!menu) throw new Error("Menu not found");

  if (menu.status === STATUS.ARCHIVED) {
    throw new Error("Menu already archived");
  }

  return await menusRepository.updateStatus(id, STATUS.ARCHIVED);
};

const getMenuStats = async () => {
  return await menusRepository.getMenuStats();
};

module.exports = {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  purgeMenu,
  updateStatus,
  restockMenu,
  updateQty,
  sellMenu,
  publishMenu,
  inactiveMenu,
  archiveMenu,
  getMenuStats,
};
