DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Haribo Gummy Bears", "Candy", 1.18, 200),
  ("Bang", "Energy Drinks", 2.50, 180),
  ("12 Pack of Bacon", "Food", 50.00, 135),
  ("Ray Bands", "Accessories", 158.99, 12),
  ("8 Pack of Wool Socks", "Apparel", 20.00, 43),
  ("Nike MetCom Trainers", "Shoes", 129.99, 50),
  ("Infinity Scarf", "Apparel", 18.00, 46),
  ("12 Pack of Nail Polish", "Beauty", 48.99, 100)