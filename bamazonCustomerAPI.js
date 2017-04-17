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
    // create a clozecard (accessed at POST http://localhost:8080/api/clozecards)
    .post(function(req, res) {
        var clozeCard = {};
        ClozeCard.call(clozeCard, req.body.fullText, req.body.cloze);
        if (clozeCard.valid === true) {
            delete clozeCard.valid;
            flashCardDB.query(
            "INSERT INTO cloze_flash_cards set ?",clozeCard,function (err, res) {
                if (err) {
                    throw err;
                    //probably need something here to respond but with the fact things weren't created.  But not
                    //really sure how these throw errors really work.
                }
            }
            );
            res.json({ 
                message: 'Cloze card created!',
                success: true
            });
        }
        else {
            res.json({
                message: 'Cloze card was not valid, not created!',
                success: false
            })
        }
        clozeCard = {};
    });
        
// REGISTER THE ROUTES -------------------------------
// all of routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
}

exports.startAPI = startAPI;
