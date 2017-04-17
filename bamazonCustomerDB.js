var mysql      = require("mysql");

var BamazonDB = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Bmtsubs1!1",
  database: "BamazonDB"
});

BamazonDB.connect(function(err) {
  if (err) throw err;
});

var getCatalog = function(department_id, callback) {
    var sql = "select product_id, product_name, price from products"
    if (department_id != null) {
        sql = sql + " where department_id = ?"
    }
    BamazonDB.query(sql,department_id, function(dbErr, dbRes) {
        if (dbErr) throw dbErr;
        callback(dbRes);
    });
};

exports.getCatalog = getCatalog;


var processSale = function(productID, quantity, callback) {
    checkInventory(productID, quantity, function(enoughInventory){
        if (enoughInventory) {
            postSale(productID, quantity, function(postedSuccessfully) {
                if (postedSuccessfully) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            })
        }
        else {
            callback(false);
        }

    });
};

exports.processSale = processSale;

function checkInventory(productID, quantity, enoughInventory) {
    var sql = "select stock_quantity from products where product_id = ?"
    BamazonDB.query(sql,productID, function(dbErr, dbRes) {
        if (dbErr) throw dbErr;
        enoughInventory(quantity <= dbRes[0].stock_quantity) ;
    });
 
}


function postSale(productID, quantity, postedSuccessfully) {
    var sql = "update products set stock_quantity = products.stock_quantity - ?, product_sales = products.product_sales + (? * products.price) where product_id = ?"
    BamazonDB.query(sql,[quantity, quantity, productID], function(dbErr, dbRes) {
        if (dbErr) throw dbErr;
        postedSuccessfully(true);
    });
};


// The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.


