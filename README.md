# Project Kantin API

Simple REST API untuk mengelola menu kantin (stok, penjualan, status).
Project ini dibuat sebagai latihan backend fundamental menggunakan Node.js dan Express.

---

## Tech Stack

- Node.js
- Express.js
- JavaScript (CommonJS)
- Git & GitHub

---

## Project Structure

```
project-kantin/
│
├── server.js
├── package.json
├── package-lock.json
│
├── src/
│   ├── app.js
│   │
│   ├── routes/
│   │   └── menus.route.js
│   │
│   ├── controllers/
│   │   └── menus.controller.js
│   │
│   ├── cafetaria.js
│   │
│   └── constants/
│       └── status.js
```

---

## Installation & Run

Install dependencies:
```bash
npm install
```

Run server:
```bash
node server.js
```

Server berjalan di:
```
http://localhost:3000
```

---

## API Endpoints

### Menu
- GET /menus
- GET /menus/:id
- POST /menus
- PUT /menus/:id
- DELETE /menus/:id

### Stock & Sales
- POST /menus/:id/restock
- POST /menus/:id/sell

---

## Notes

- Data masih menggunakan in-memory (tanpa database)
- Cocok untuk latihan backend dasar
- Siap dikembangkan ke database di tahap selanjutnya

---

## Author

Rifqi Pratama
Junior Backend Developer

