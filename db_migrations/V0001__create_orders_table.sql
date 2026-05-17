CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);