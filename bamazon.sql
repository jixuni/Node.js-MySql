CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INT NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (100) NULL,
    department_name VARCHAR
    (100) NULL,
    price DECIMAL
    (10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY
    (item_id)
)

    SELECT *
    FROM products;

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUE
    ("Staples",
    "Office-supplies",
    3.50,
    500
    ),
    ("T-shirt", "Clothing", 15.55 , 1000),
    ("Boots", "Clothing", 99.99, 1500),
    ("Laptops", "ELectronics", 1200, 400),
    ("Sweets", "Food", 5, 50000),
    ("Jeans", "Clothing", 52.54, 244),
    ("Legos", "Toys", 75.99, 100),
    ("Light-Sabers", "Toys", 49.99, 73),
    ("Pens", "Office-supplies", 4.99, 12300),
    ("CDs", "Music", 19.99, 2200);

    SELECT *
    FROM products;
    DELETE FROM products WHERE item_id = 1;

    UPDATE products SET item_id = 1 WHERE item_id = 11;


