# Project Kantin Backend API

Backend service untuk manajemen menu kantin, stok, dan lifecycle status menu. Dibangun dengan **Node.js, Express, dan PostgreSQL** menggunakan arsitektur **Controller – Service – Repository**.

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)
- Nodemon

---

## Project Structure

```
src/
│
├── controllers/        # Handle HTTP request & response
├── services/           # Business logic & rules
├── repositories/       # Database queries
├── routes/             # API routes
├── constants/          # Status & enums
└── app.js
```

---

## Menu Lifecycle (Status)

Menu memiliki lifecycle status untuk menjaga konsistensi bisnis:

| Status         | Deskripsi                                      |
| -------------- | ---------------------------------------------- |
| `DRAFT`        | Menu baru, belum bisa dijual                   |
| `PUBLISHED`    | Menu aktif dan bisa dijual                     |
| `OUT_OF_STOCK` | Stok habis (otomatis)                          |
| `INACTIVE`     | Dinonaktifkan sementara                        |
| `ARCHIVED`     | Soft delete (tidak tampil & tidak bisa dijual) |

---

## Business Rules

- Menu **tidak bisa dijual** jika status:
  - `DRAFT`
  - `ARCHIVED`
  - `INACTIVE`
- Stok tidak boleh minus
- Jika stok habis → status otomatis `OUT_OF_STOCK`
- Menu dengan stok kosong **tidak bisa dipublish**
- `ARCHIVED` tidak bisa langsung dipublish

---

## API Endpoints

### Menu

| Method | Endpoint     | Deskripsi             |
| ------ | ------------ | --------------------- |
| GET    | `/menus`     | Ambil semua menu      |
| GET    | `/menus/:id` | Ambil menu by ID      |
| POST   | `/menus`     | Tambah menu baru      |
| PUT    | `/menus/:id` | Update data menu      |
| DELETE | `/menus/:id` | Soft delete (archive) |

---

### Stock & Transaction

| Method | Endpoint             | Deskripsi                |
| ------ | -------------------- | ------------------------ |
| POST   | `/menus/:id/restock` | Tambah stok              |
| POST   | `/menus/:id/sell`    | Jual menu (kurangi stok) |
| PUT    | `/menus/:id/qty`     | Update qty manual        |

---

### Status Action

| Method | Endpoint              | Deskripsi              |
| ------ | --------------------- | ---------------------- |
| PUT    | `/menus/:id/publish`  | Publish menu           |
| PUT    | `/menus/:id/inactive` | Inactive menu          |
| PUT    | `/menus/:id/archive`  | Archive menu           |
| DELETE | `/menus/:id/purge`    | Hard delete (permanen) |

---

## Design Decisions

- **Status tidak diubah lewat update menu biasa** → lebih aman
- Soft delete menggunakan `ARCHIVED`
- Hard delete (`purge`) dipisah untuk admin/maintenance
- Business logic disimpan di service layer

---

## API Testing

Semua endpoint telah diuji menggunakan **Postman Collection**.

---

## Setup Project

```bash
npm install
npm run dev
```

Pastikan PostgreSQL sudah berjalan dan environment variable sudah di-set.

---

## Future Improvement

- Authentication & Role (Admin / Cashier)
- Transaction history
- Pagination & filtering
- Unit & integration testing

---

## Author

Rifqi Pratama
Junior Backend Developer
