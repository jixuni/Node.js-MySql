var mysql = require("mysql");
var inquirer = require("inquirer");
require('dotenv').config();

const {
    table
} = require('table');


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

});


managerMenu();


function managerMenu() {
    inquirer
        .prompt([{
            name: "managerView",
            type: "list",
            message: "What would you like to view?",
            choices: ["View products for sale", "View low inventory", "Add inventory", "Add new product"]
        }])
        .then(function (answer) {

            if (answer.managerView === "View products for sale") {
                viewProducts();
            } else if (answer.managerView === "View low inventory") {
                lowInventory();
            } else if (answer.managerView === "Add inventory") {
                addInventory();
            }


        })

}


function viewProducts() {

    var query = "SELECT * FROM products";
    connection.query(query, function (error, result, fields) {
        for (var i = 0; i < result.length; i++) {
            let data,
                output;

            data = [
                ['Item id#', 'Product Name', 'Item Price', 'Stock quantity'],
                [`ID: ${result[i].item_id}`, `${result[i].product_name}`, `$${result[i].price}`, `${result[i].stock_quantity}`],
            ];
            output = table(data);
            console.log(output);
        }
    })
}

function lowInventory() {
    var query = "SELECT * FROM products";
    let data,
        output;
    connection.query(query, function (error, result, fields) {
        for (var i = 0; i < result.length; i++) {
            if (result[i].stock_quantity < 5) {
                data = [
                    ['Item id#', 'Product Name', 'Stock quantity'],
                    [`ID: ${result[i].item_id}`, `${result[i].product_name}`, `${result[i].stock_quantity}`]
                ]
                output = table(data);
                console.log(output);
            } else {
                data = [
                    ['Item id#', 'Product Name', 'Stock quantity'],
                    [`ID: ${result[i].item_id}`, `${result[i].product_name}`, `Enough`]
                ]
                output = table(data);
                console.log(output);
            }
        }
    })
}

function addInventory() {
    var query = "SELECT * FROM products";
    connection.query(query, function (error, result, fields) {

        inquirer
            .prompt([{
                    name: "addProducts",
                    type: "checkbox",
                    message: "Which products would you like to add more inventory?",
                    choices: [result[0].product_name, result[1].product_name, result[2].product_name, result[3].product_name, result[4].product_name, result[5].product_name, result[6].product_name, result[7].product_name, result[8].product_name, result[9].product_name, ],
                },
                {
                    name: "numProducts",
                    type: "list",
                    message: "How many would to like to restock?",
                    choices: ['1', "10", '100', '1000', '5000']
                }
            ])
            .then(function (answer) {


                console.log(answer.addProducts, answer.numProducts);
            })
    })

}