CREATE DATABASE BamazonDB;

USE BamazonDB;

CREATE TABLE products (
  product_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_id INT NOT NULL,
  price DECIMAL(8,2) NOT NULL DEFAULT 0.00,
  stock_quantity INT NOT NULL DEFAULT 0,
  product_sales DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (product_id));

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  total_sales DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (department_id));
