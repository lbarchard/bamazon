var inquirer    = require("inquirer");
var customerDB  = require("./bamazonCustomerDB.js");

// customerDB.processSale(1,3);


var guideCustomer = function() {
    customerDB.getCatalog(null, function(items){
        inquirer.prompt([
            {
                type: 'list',
                name: 'item',
                message: 'Choose an item from the catalog',
                choices: items
            },
            {
                type: 'prompt',
                name: 'quantity',
                message: 'How many do you want?'
            }
]).then(function (answers) {
  productID = answers.item.split(" ")[0];
  quantity = answers.quantity;
  customerDB.processSale(productID, quantity, function(completedSale) {
      if (completedSale) {
          console.log("Cha-Ching your order has been placed, order more!");
          console.log("**********************")
      }
      else {
          console.log("Sorry not enough inventory.  Please order something else")
          console.log("**********************")

      }
      guideCustomer()
  })
})
})
};


exports.guideCustomer = guideCustomer;
