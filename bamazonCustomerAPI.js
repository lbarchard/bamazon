var express    = require('express');  
var app        = express();     
var bodyParser = require('body-parser');
var customerDB = require("./bamazonCustomerDB.js");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


var startAPI = function() {

router.use(function(req, res, next) {
    // do logging
    console.log(req.originalUrl);
    console.log(req.body);
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/catalog', function(req, res) {
        customerDB.getCatalog(null, function(items){
            res.json({
                items
            });
        });
    });

router.route('/sale')
    // complete a sale (accessed at POST http://localhost:8080/api/sale)
    .post(function(req, res) {
        customerDB.processSale(req.body.productID, req.body.quantity, function(completedSale) {
            if (completedSale) {
                res.json({ 
                    message: 'Sale recorded',
                    success: true
                });
            }
            else {
                res.json({
                message: 'Insufficient Inventory',
                success: false
                })
            }
        })
    })
        
// REGISTER THE ROUTES -------------------------------
// all of routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
}

exports.startAPI = startAPI;
