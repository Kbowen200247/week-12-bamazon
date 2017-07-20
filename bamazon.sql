CREATE database bamazon;

use bamazon;

CREATE TABLE Products(
	item_id INT(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,4) NOT NULL,
	stock_quantity INT(10) NOT NULL,
	PRIMARY KEY(item_id)
);

SELECT * FROM Products;

INSERT INTO Products (
	product_name, department_name, price, stock_quantity
) VALUES
	('Playstation 3', 'Electronics', 270.00, 100),
	('Kindle', 'Books', 80.00, 80),
	('Nook', 'Books', 100.95, 90),
	('SORRY!', 'Entertaiment', 10.00, 75),
	('Apples To Apples Junior', 'Entertaiment', 14.90, 35),
	('X-Box One', 'Electronics', 399.99, 10000),
	('Drapey Lux Maxi Dress', 'Clothing', 65.99, 65),
	('Purple FLower Floral Skirt', 'Clothing', 35.95, 25),
	('The Fate of the Furious 8', 'Entertaiment', 20.95, 200),
	('Wonder Woman', 'Entertaiment', 24.99, 350);

CREATE TABLE Departments (
	department_id INT(10) AUTO_INCREMENT NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	over_head_costs DECIMAL(10,2) NOT NULL,
	product_sales DECIMAL(10,2),
	total_profit DECIMAL(10,2), NOT NULL,
	PRIMARY KEY(department_id)
);

INSERT INTO Departments (department_name, over_head_costs)
VALUES ('Electronics', 1000),
('Books', 2000),
('Entertaiment', 500),
('Clothing', 200),
('Food', 100);