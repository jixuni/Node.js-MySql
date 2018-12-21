var mysql = require("mysql");
var inquirer = require("inquirer");
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.DB_HOST,


    port: 3306,


    user: process.env.DB_USER,


    password: process.env.DB_PASS,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to Bamazon!");
    showProducts();
});

function showProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function (error, result, fields) {

        for (var i = 0; i < result.length; i++) {
            console.log(`ID: ${result[i].item_id} - ${result[i].product_name} $${result[i].price}`);
            //console.log("Id:" + result[i].item_id, result[i].product_name, "$" + result[i].price);
        }
        askPurchase();
    })
}

function askPurchase() {
    inquirer
        .prompt([{
                name: "itemsId",
                type: "input",
                mesage: "What is the item id you would like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === true || value > 10) {
                        return false;
                    }
                    return true;
                }

            },
            {
                name: "itemQuantity",
                type: "input",
                message: "How many would you like to purchase?"
            }
        ])
        .then(function (answer) {
            var itemId = parseInt(answer.itemsId);
            var numPurchase = parseInt(answer.itemQuantity);
            var query = "SELECT * FROM products WHERE item_id = ?";
            connection.query(query, [itemId], function (error, result, fields) {
                var stockQuantity = result[0].stock_quantity;

                if (stockQuantity >= numPurchase) {
                    stockQuantity -= numPurchase;
                    updateDb(stockQuantity, itemId);
                    console.log(`${numPurchase} ${result[0].product_name} purchased`)
                    //console.log(numPurchase + " " + result[0].product_name + " purchased");
                    console.log(stockQuantity + " left in stock.");
                    reRun();
                } else {
                    console.log(numPurchase + " That purchase order is too large");
                    console.log("Pick again.")
                    askPurchase();
                }

            })

        })
}

function updateDb(num, id) {
    var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
    connection.query(query, [num, id], function (error, result, fields) {

    })
}

function reRun() {
    inquirer
        .prompt([{
            name: "askAgain",
            type: "confirm",
            message: "Would you like to make another purchase?"
        }])
        .then(function (answer) {
            if (answer.askAgain === false) {
                connection.end();
            } else {
                askPurchase();
            }

        })
}