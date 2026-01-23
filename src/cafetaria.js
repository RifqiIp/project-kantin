const STATUS = require("./constants/status");

class Cafetaria {
  constructor(name) {
    this.name = name;
    this.menus = [];
  }

  // ====== BASIC INFO ======

  // informasi cafetaria
  getInfo() {
    return `Cafetaria Name: ${this.name}`;
  }

  //ganti nama cafetaria
  renameCafetaria(newName) {
    this.name = newName;
  }

  //------------------------------

  //===== MENU MANAGEMENT ======

  // tambah menu
  addMenu({ id, name, price, type, qty, status = STATUS.DRAFT }) {
    // validasi input
    if (!id || !name || !price || !type || qty === undefined) {
      throw new Error("All menu fields must be provided");
    }

    if (qty < 0) {
      throw new Error("Quantity cannot be negative");
    }

    if (this.menus.some((menu) => menu.id === id)) {
      throw new Error("Menu with this ID already exists");
    }

    if (this.menus.some((menu) => menu.name === name)) {
      throw new Error("Menu with this name already exists");
    }

    const menu = { id, name, price, type, qty, soldQty: 0, status };

    this.menus.push(menu);

    return {
      success: true,
      message: `Menu ${name} added successfully`,
      data: menu,
    };
  }

  // update menu
  updateMenu(menuId, updatedData) {
    const menu = this.menus.find((m) => m.id === menuId);
    if (!menu) throw new Error("Menu not found");

    if (
      updatedData.name &&
      this.menus.some((m) => m.name === updatedData.name && m.id !== menuId)
    ) {
      throw new Error("Menu name already exists");
    }

    Object.assign(menu, updatedData);

    return {
      success: true,
      message: `Updated menu ${menu.name}`,
      data: menu,
    };
  }

  // restock menu
  restockMenu(menuId, additionalQty) {
    const menu = this.menus.find((m) => m.id === menuId);

    if (!menu) throw new Error("Menu not found");

    if (additionalQty <= 0) {
      throw new Error("Additional quantity must be greater than zero");
    }

    if (menu) {
      menu.qty += additionalQty;

      return {
        success: true,
        message: `Restocked ${menu.name} by ${additionalQty}`,
        data: menu,
      };
    }
  }

  // update stok menu
  updateStock(menuId, newQty) {
    const menu = this.menus.find((m) => m.id === menuId);

    if (!menu) throw new Error("Menu not found");

    if (newQty < 0) throw new Error("Stock cannot be negative");

    if (menu) {
      menu.qty = newQty;

      return {
        success: true,
        message: `Updated stock for ${menu.name} to ${newQty}`,
        data: menu,
      };
    }
  }

  // update status menu
  updateStatus(menuId, newStatus) {
    const menu = this.menus.find((m) => m.id === menuId);

    if (!menu) {
      throw new Error("Menu not found");
    }

    if (
      newStatus !== STATUS.DRAFT &&
      newStatus !== STATUS.PUBLISHED &&
      newStatus !== STATUS.ARCHIVED &&
      newStatus !== STATUS.OUT_OF_STOCK
    ) {
      throw new Error("Invalid Status");
    }

    if (menu) {
      menu.status = newStatus;

      return {
        success: true,
        message: `Updated status for ${menu.name} to ${newStatus}`,
        data: menu,
      };
    }
  }

  // arsipkan menu
  archiveMenu(menuId) {
    const menu = this.menus.find((m) => m.id === menuId);

    if (!menu) throw new Error("Menu not found");

    if (menu) {
      menu.status = STATUS.ARCHIVED;

      return {
        success: true,
        message: `Archived ${menu.name}`,
        data: menu,
      };
    }
  }

  // hapus menu
  deleteMenu(menuId) {
    const menuIndex = this.menus.findIndex((m) => m.id === menuId);

    if (menuIndex === -1) throw new Error("Menu not found");

    const deleteMenu = this.menus[menuIndex];

    this.menus.splice(menuIndex, 1);

    return {
      success: true,
      message: `Deleted menu with ID ${menuId}`,
      data: deleteMenu,
    };
  }

  // jual menu
  sellMenu(menuId, Quantity) {
    // validasi quantity
    if (Quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }

    const menu = this.menus.find((m) => m.id === menuId);

    // validasi menu ada atau tidak
    if (!menu) {
      throw new Error("Menu not found");
    }
    if (menu.status === STATUS.DRAFT || menu.status === STATUS.ARCHIVED) {
      throw new Error("Menu cannot be Sold");
    }

    if (Quantity > menu.qty) {
      throw new Error("Insufficient stock");
    }

    menu.qty -= Quantity; // kurangi stok
    menu.soldQty += Quantity; // tambah jumlah terjual

    // validasi stok habis
    if (menu.qty === 0) {
      menu.status = STATUS.OUT_OF_STOCK;
    }

    return {
      success: true,
      message: `Sold ${Quantity} of ${menu.name}`,
      data: menu,
    };
  }

  //------------------------------

  // ====== QUERY / FILTER ======

  // filter menu berdasarkan tipe
  filterMenuByType(type) {
    return this.menus.filter((menu) => menu.type === type);
  }

  // tampilkan semua menu
  showMenus() {
    return this.menus;
  }

  // tampilkan menu yang terjual
  showSoldMenus() {
    return this.menus.filter((menu) => menu.soldQty > 0);
  }

  // cari menu
  searchMenu(query) {
    let results = this.menus;

    if (query.name) {
      results = results.filter((m) =>
        m.name.toLowerCase().includes(query.name.toLowerCase()),
      );
    }

    if (query.type) {
      results = results.filter((m) => m.type === query.type);
    }
    

    return {
      success: true,
      data: results,
    };
  }

  // cari menu by id
  findMenuById(menuId) {
    const menu = this.menus.find((m) => m.id === menuId);

    if (!menu) {
      throw new Error("Menu not found");
    }

    return {
      success: true,
      data: menu,
    };
  }

  //------------------------------

  //===== calculations ======

  // hitung total menu
  totalMenu() {
    return this.menus.length;
  }

  // menu dengan harga tertinggi
  highestPriceMenu() {
    if (this.menus.length === 0) return null;

    return this.menus.reduce((highest, menu) =>
      menu.price > highest.price ? menu : highest,
    );
  }

  // menu dengan harga terendah
  lowestPriceMenu() {
    if (this.menus.length === 0) return null;

    return this.menus.reduce((lowest, menu) =>
      menu.price < lowest.price ? menu : lowest,
    );
  }

  // hitung total pendapatan
  totalRevenue() {
    return this.menus.reduce(
      (total, menu) => total + menu.price * menu.soldQty,
      0,
    );
  }

  // detail pendapatan per menu
  revenueDetail() {
    return this.menus.map((menu) => ({
      name: menu.name,
      soldQty: menu.soldQty,
      revenue: menu.price * menu.soldQty,
    }));
  }

  // hitung total nilai stok
  totalStockValue() {
    return this.menus.reduce((total, menu) => total + menu.price * menu.qty, 0);
  }
}

module.exports = Cafetaria;

// contoh penggunaan class Cafetaria
// const cafe1 = new Cafetaria("Warung Sedap");

// console.log(cafe1.getInfo());

// function logAction(result) {
//   if (result?.message) {
//     console.log(result.message);
//   }
// }

// cafe1.addMenu({
//   id: 1,
//   name: "Nasi Uduk",
//   price: 15000,
//   type: "Makanan",
//   qty: 10,
// });
// cafe1.addMenu({ id: 2, name: "Es Teh", price: 5000, type: "Minuman", qty: 20 });

// tambah menu
// logAction(
//   cafe1.addMenu({
//     id: 1,
//     name: "Nasi Uduk",
//     price: 15000,
//     type: "Makanan",
//     qty: 10,
//   })
// );
// logAction(
//   cafe1.addMenu({
//     id: 2,
//     name: "Ayam Goreng",
//     price: 20000,
//     type: "Makanan",
//     qty: 5,
//   })
// );
// logAction(
//   cafe1.addMenu({
//     id: 3,
//     name: "Es Teh",
//     price: 5000,
//     type: "Minuman",
//     qty: 20,
//   })
// );
// logAction(
//   cafe1.addMenu({
//     id: 4,
//     name: "Kopi",
//     price: 8000,
//     type: "Minuman",
//     qty: 0,
//   })
// ); // stok 0 diperbolehkan
// logAction(
//   cafe1.addMenu({
//     id: 5,
//     name: "Susu",
//     price: 8000,
//     type: "Minuman",
//     qty: 15,
//   })
// );

// tampilkan info cafetaria dan menu

// console.log(cafe1.showMenus());
// console.log("Total Menus:", cafe1.totalMenu());

// console.log("Total Stock Value:", cafe1.totalStockValue());
// const hashighestPriceMenu = cafe1.highestPriceMenu();
// const haslowestPriceMenu = cafe1.lowestPriceMenu();
// const MinumanMenus = cafe1.filterMenuByType("Minuman");
// MinumanMenus.forEach((m) => console.log(m.name));
// const MinumanTermahal = MinumanMenus.reduce((highest, menu) =>
//   menu.price > highest.price ? menu : highest
// );
// console.log(
//   "Minuman termahal adalah:",
//   MinumanTermahal.name,
//   "dengan harga:",
//   MinumanTermahal.price
// );

// console.log("Minuman Menus:", MinumanMenus);

// const MakananMenus = cafe1.filterMenuByType("Makanan");
// for (const m of MakananMenus) {
//   console.log(m.name);
// }

// console.log("Makanan Menus:", MakananMenus);

// console.log("Highest Price Menu:", hashighestPriceMenu.price);
// console.log("Lowest Price Menu:", haslowestPriceMenu.price);
// console.log("Highest Price Menu:", cafe1.highestPriceMenu());
// console.log("Lowest Price Menu:", cafe1.lowestPriceMenu());

// const restockResult = cafe1.restockMenu(4, 10);
// console.log(restockResult);
// console.log("Menus after restock:", cafe1.showMenus());

// // Update stok menu
// const updateStockResult = cafe1.updateStock(4, 8);
// console.log(updateStockResult);
// console.log("Updated Menus:", cafe1.showMenus());

// updateStatusResult = cafe1.updateStatus(5, STATUS.PUBLISHED);
// console.log(updateStatusResult);
// console.log("Updated Menus:", cafe1.showMenus());

// updateMenuResult = cafe1.updateMenu(5, { price: 9000, name: "Susu Dingin" });
// console.log(updateMenuResult);
// console.log("Updated Menus:", cafe1.showMenus());

// archiveMenuResult = cafe1.archiveMenu(2);
// console.log(archiveMenuResult);
// console.log("Updated Menus:", cafe1.showMenus());

// console.log("Total Stock Value:", cafe1.totalStockValue());

// // Filter menu berdasarkan tipe
// console.log("Minuman Menus:", cafe1.filterMenuByType("Minuman"));
// console.log("Makanan Menus:", cafe1.filterMenuByType("Makanan"));

// // Jual menu
// const result1 = cafe1.sellMenu(2, 3);
// const result2 = cafe1.sellMenu(1, 2);
// const result3 = cafe1.sellMenu(3, 5);
// console.log(result1);
// console.log(result2);
// console.log(result3);

// // console.log("Menus after sale:", cafe1.showMenus());

// console.log("Sold Menus:", cafe1.showSoldMenus());

// // Hitung total pendapatan
// cafe1.revenueDetail().forEach((m) => {
//   if (m.soldQty > 0) {
//     console.log(
//       `Menu: ${m.name}, Sold Quantity: ${m.soldQty}, Revenue: ${m.revenue}`
//     );
//   } else {
//     console.log(`Menu: ${m.name} has no sales.`);
//   }
// });

// console.log("Total Stock Value after sales:", cafe1.totalStockValue());

// Ganti nama cafetaria
// console.log("Renaming Cafetaria...");
// cafe1.renameCafetaria("Warung Lezat");
// console.log(cafe1.Info());
