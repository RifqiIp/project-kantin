# Project Kantin API

Simple REST API untuk mengelola menu kantin (stok, penjualan, status).  
Project ini dibuat sebagai latihan **backend fundamental hingga intermediate** menggunakan **Node.js, Express, dan PostgreSQL** dengan arsitektur berlapis.

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JavaScript (CommonJS)
- Git & GitHub
- dotenv

---

## Architecture Overview

Project ini menggunakan pola **layered architecture**:

Controller → Service → Repository → Database

- Controller: handle HTTP request & response  
- Service: business logic & validation  
- Repository: query ke database (PostgreSQL)  
- Database: PostgreSQL  

---

## Project Structure

```
project-kantin/
│
├── server.js
├── package.json
├── package-lock.json
├── .env.example
│
├── database/
│   └── kantin.sql
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
│   ├── services/
│   │   └── menus.service.js
│   │
│   ├── repositories/
│   │   └── menus.repository.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   └── constants/
│       └── status.js
```

---

## Database

Project ini menggunakan **PostgreSQL**.

Struktur database dapat dilihat di:
```
database/kantin.sql
```

---

## Environment Variables

Buat file `.env`:

```
DB_USER=kantin_user
DB_PASSWORD=your_password
DB_NAME=kantin_db
DB_PORT=5432
```

---

## Installation & Run

```bash
npm install
npm run dev
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

- Migrasi dari in-memory ke PostgreSQL
- Fokus backend & clean architecture
- Cocok untuk portfolio Junior Backend Developer

---

## Author

Rifqi Pratama  
Junior Backend Developer
