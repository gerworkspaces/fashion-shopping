-- ====================
-- Cấu hình trước khi chạy file
-- ====================
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

SET FOREIGN_KEY_CHECKS = 0;

-- ====================
-- Tạo cơ sở dữ liệu
-- ====================
CREATE DATABASE IF NOT EXISTS fashion_shopping
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE fashion_shopping;

-- ====================
-- Tạo bảng foods
-- ====================
CREATE TABLE IF NOT EXISTS foods (
  food_id INT NOT NULL AUTO_INCREMENT,
  food_name VARCHAR(50) COLLATE utf8mb4_general_ci NOT NULL,
  description TEXT COLLATE utf8mb4_general_ci,
  location VARCHAR(50) COLLATE utf8mb4_general_ci,
  price FLOAT NOT NULL,
  category_id varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  food_image text COLLATE utf8mb4_general_ci,
  stock INT DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  PRIMARY KEY (food_id),
  KEY category_id (category_id),
  CONSTRAINT foods_id_ibfk_1 FOREIGN KEY (category_id) REFERENCES categories (category_id) ON DELETE SET NULL
);

-- ====================
-- Tạo bảng categories
-- ====================
CREATE TABLE IF NOT EXISTS categories (
  category_id VARCHAR(50) COLLATE utf8mb4_general_ci NOT NULL,
  category_name VARCHAR(100) COLLATE utf8mb4_general_ci NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (category_id)
);

-- ====================
-- Tạo bảng users
-- ====================
CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) COLLATE utf8mb4_general_ci NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  address_info varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  password_hash varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  role_id int DEFAULT NULL,
  status_user varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  user_image varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (user_id),
  UNIQUE KEY username (username),
  UNIQUE KEY email (email),
  KEY role_id (role_id),
  CONSTRAINT users_ibfk_1 FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE SET NULL
);

-- ====================
-- Tạo bảng roles
-- ====================
CREATE TABLE IF NOT EXISTS roles (
  role_id int NOT NULL AUTO_INCREMENT,
  role_name varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (role_id)
);

-- ====================
-- Tạo bảng feedback
-- ====================
CREATE TABLE IF NOT EXISTS feedback (
  feedback_id int NOT NULL AUTO_INCREMENT,
  user_id int DEFAULT NULL,
  content text COLLATE utf8mb4_general_ci NOT NULL,
  full_name varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  email varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  subject varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (feedback_id)
);

-- ====================
-- Tạo bảng reviews
-- ====================
CREATE TABLE IF NOT EXISTS review_food (
  review_id INT NOT NULL AUTO_INCREMENT,
  menu_id INT NOT NULL,
  user_id INT NOT NULL,
  subject varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  email varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  full_name varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  content text COLLATE utf8mb4_general_ci NOT NULL,
  rating INT NOT NULL,
  PRIMARY KEY (review_id),
  CONSTRAINT review_food_chk_1 CHECK (rating between 1 and 5)
);

-- ====================
-- Tạo bảng orders
-- ====================
CREATE TABLE IF NOT EXISTS order_products (
  order_id INT NOT NULL AUTO_INCREMENT,
  total_products int NOT NULL,
  available_products int NOT NULL,
  product_price decimal(10,2) NOT NULL,
  order_name varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  order_image text COLLATE utf8mb4_general_ci,
  order_description text COLLATE utf8mb4_general_ci,
  order_status ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (order_id),
  CONSTRAINT order_products_ibfk_2 FOREIGN KEY (order_id) REFERENCES menus (menu_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS menus (
  menu_id INT PRIMARY KEY AUTO_INCREMENT,
  menu_name VARCHAR(100) NOT NULL,
  menu_date DATE NOT NULL,
  menu_image TEXT,
  description TEXT,
  food_id INT,
  FOREIGN KEY (food_id) REFERENCES foods(food_id) ON DELETE CASCADE
);

-- ====================
-- Tạo bảng product_details
-- ====================
CREATE TABLE IF NOT EXISTS product_details (
  product_id int NOT NULL AUTO_INCREMENT,
  menu_id int NOT NULL,
  user_id int DEFAULT NULL,
  purchase_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  product_quantity int NOT NULL,
  PRIMARY KEY (product_id),
  KEY user_id (user_id),
  KEY menu_id (menu_id),
  CONSTRAINT product_details_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE SET NULL,
  CONSTRAINT product_details_ibfk_2 FOREIGN KEY (menu_id) REFERENCES menus (menu_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS payments (
  payment_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  menu_id int NOT NULL,
  amount_paid decimal(10,2) NOT NULL,
  payment_method enum('PayPal') COLLATE utf8mb4_general_ci DEFAULT 'PayPal',
  payment_status enum('Completed','Pending','Failed') COLLATE utf8mb4_general_ci DEFAULT 'Pending',
  paypal_order_id varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  paypal_capture_id varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  paypal_transaction_id varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  paypal_payer_id varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  currency_code varchar(10) COLLATE utf8mb4_general_ci DEFAULT 'USD',
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (payment_id),
  KEY user_id (user_id),
  KEY menu_id (menu_id),
  CONSTRAINT payments_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id),
  CONSTRAINT payments_ibfk_2 FOREIGN KEY (menu_id) REFERENCES menus (menu_id)
);

CREATE TABLE IF NOT EXISTS meal_types (
  meal_type_id varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  meal_type_name varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (meal_type_id)
);

CREATE TABLE IF NOT EXISTS meals (
  meal_id int NOT NULL AUTO_INCREMENT,
  user_id int DEFAULT NULL,
  title varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  content text COLLATE utf8mb4_general_ci NOT NULL,
  meal_date date NOT NULL,
  meal_type_id varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  meal_image text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (meal_id),
  KEY user_id (user_id),
  KEY meal_type_id (meal_type_id),
  CONSTRAINT meals_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE SET NULL,
  CONSTRAINT meals_ibfk_2 FOREIGN KEY (meal_type_id) REFERENCES meal_types (meal_type_id) ON DELETE SET NULL
);

-- ====================
-- Tạo bảng cart_items
-- ====================
-- CREATE TABLE IF NOT EXISTS cart_items (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   user_id INT NOT NULL,
--   food_id INT NOT NULL,
--   quantity INT NOT NULL DEFAULT 1,
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--   FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE,
--   INDEX idx_user_id (user_id),
--   INDEX idx_food_id (food_id)
-- );

-- ====================
-- Tạo bảng order_items
-- ====================
-- CREATE TABLE IF NOT EXISTS order_items (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   order_id INT NOT NULL,
--   food_id INT NOT NULL,
--   quantity INT NOT NULL DEFAULT 1,
--   price FLOAT NOT NULL COMMENT 'Giá tại thời điểm mua',
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
--   FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE,
--   INDEX idx_order_id (order_id),
--   INDEX idx_food_id (food_id)
-- );

INSERT INTO foods VALUES
(1,'Bánh mì thịt', 'Bánh mì giòn, đầy đủ topping', 'Hoi an', 20000, 'sandwich', '', 50, true),
(2,'Cơm gà xối mỡ', 'Cơm trắng + gà chiên vàng', 'Danang', 45000, 'rice', '', 30, true),
(3,'Trà sữa trân châu', 'Ngon, ngọt, mát', 'Hai Chau, DN', 30000, 'drink', '', 100, true);

INSERT INTO categories VALUES 
('1', 'Local Food', '2021-01-01'),
('2', 'Fried Rice', '2021-01-01'),
('3', 'Hotdog', '2021-01-01'),
('4', 'Sandwich', '2021-01-01'), 
('5', 'Drink', '2021-01-01'),
('6', 'Dessert', '2021-01-01'),
('7', 'Salad', '2021-01-01'),
('8', 'Soup', '2021-01-01'),
('9', 'Pizza', '2021-01-01'),
('10', 'Burger', '2021-01-01'),
('11', 'Pasta', '2021-01-01');