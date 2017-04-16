USE BamazonDB;

INSERT INTO products (item_id, product_name, department_id, price, stock_quantity, product_sales)
VALUES  (1, "Shoes","1",50.00,30,0.00),
        (2, "Pants","1",40.00,20,0.00),
        (3, "Shirt","1",30.00,50,0.00),
        (4, "Toothbrush","2",3.00,200,0.00),
        (5, "Hairbrush","2",10.00,75,0.00),
        (6, "Deodorant","2",4.00,400,0.00),
        (7, "Toothpaste","2",3.00,175,0.00),
        (8, "Kettle","3",50.00,25,0.00),
        (9, "Toaster Oven","3",40.00,30,0.00),
        (10, "Blender","3",30.00,20,0.00);        

INSERT INTO departments (department_id, department_name, over_head_costs, total_sales)
VALUES  (1, "Clothes", 500.00, 0.00),
        (2, "Toiletries", 1000.00, 0.00),
        (3, "Appliances", 1500.00, 0.00);
