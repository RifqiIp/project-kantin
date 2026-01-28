# 🧠 PostgreSQL Cheatsheet (Backend Fundamental)

Cheatsheet ini dibuat untuk latihan backend (Node.js / Express) dan cocok disimpan sebagai catatan pribadi atau README.

---

## 🔑 Login & Database

```bash
psql -U postgres
```

```sql
\l              -- lihat semua database
\c nama_db      -- masuk database
\dt             -- lihat semua tabel
\d nama_tabel   -- detail struktur tabel
\q              -- keluar
```

---

## 🧱 TABLE (Struktur)

### CREATE TABLE
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    role VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### DROP TABLE
```sql
DROP TABLE users;
```

---

## 📥 INSERT (Tambah Data)

```sql
INSERT INTO users (name, email, role)
VALUES ('Rifqi', 'rifqi@mail.com', 'admin');
```

Multiple data:
```sql
INSERT INTO users (name, email, role)
VALUES
('Ani', 'ani@mail.com', 'kasir'),
('Budi', 'budi@mail.com', 'owner');
```

---

## 📤 SELECT (Ambil Data)

Ambil semua data:
```sql
SELECT * FROM users;
```

Ambil kolom tertentu:
```sql
SELECT name, role FROM users;
```

Filter data:
```sql
SELECT * FROM users WHERE role = 'admin';
```

Ambil berdasarkan ID:
```sql
SELECT * FROM users WHERE id = 1;
```

Urutkan data:
```sql
SELECT * FROM users ORDER BY id DESC;
```

Batasi data:
```sql
SELECT * FROM users LIMIT 5;
```

---

## ✏️ UPDATE (Ubah Data)

```sql
UPDATE users
SET role = 'kasir'
WHERE id = 1;
```

⚠️ Selalu gunakan WHERE agar tidak mengubah semua data.

---

## 🗑 DELETE (Hapus Data)

```sql
DELETE FROM users WHERE id = 1;
```

⚠️ Tanpa WHERE = semua data terhapus.

---

## 🔗 RELASI (FOREIGN KEY)

```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    total INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔄 JOIN (Relasi Tabel)

```sql
SELECT users.name, orders.total
FROM users
JOIN orders ON users.id = orders.user_id;
```

---

## 🔍 Pencarian (LIKE)

```sql
SELECT * FROM users WHERE name ILIKE '%rif%';
```

---

## 📊 Aggregate (Hitung)

```sql
SELECT COUNT(*) FROM users;
SELECT SUM(total) FROM orders;
SELECT AVG(total) FROM orders;
```

---

## 🔐 TRANSACTION (Aman)

```sql
BEGIN;
UPDATE users SET role = 'admin' WHERE id = 2;
COMMIT;
-- atau
ROLLBACK;
```

---

## 🧠 Rule Emas Backend

```
CREATE → INSERT → SELECT → UPDATE → DELETE
```

80% pekerjaan backend = SELECT + WHERE.

---

## 📦 Tips Backend (Node.js)

- Jangan simpan password asli (hash!)
- Gunakan `.env` untuk config
- Biasakan `RETURNING *`

```sql
INSERT INTO users (name)
VALUES ('Test')
RETURNING *;
```

---

✍️ Author: Rifqi Pratama

