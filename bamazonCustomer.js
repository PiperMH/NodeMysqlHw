var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Initializes MySQL database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "root",
  database: "bamazon"
});

// Creates connection & loads the product 
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  init();
});

// Function to load products
function init() {
  
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    //prints table of products in console using a table npm
    console.table(res);

    //asks user what item they would like to choose
    itemChoice(res);
  });
}


// Prompt the customer for a product ID
function itemChoice(stock) {
  // Prompts user for what they would like to purchase
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the ID of the item you would you like to purchase?",
        name: "choice"
      }
    ])
    .then(function(val) {
     
      var itemNumber = parseInt(val.choice);
      var product = stockCheck(itemNumber, stock);

      // If there is a product with the id the user chose, prompt the customer for a desired amount
      if (product) {
        // Pass the chosen product to promptCustomerForQuantity
        numberOfItems(product);
      }
      else {
       
        console.log("\nThat item is not in the inventory.");
        init();
      }
    });
}

// Prompt the customer for a product quantity
function numberOfItems(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "amount",
        message: "How many would you like?"
      }
    ])
    .then(function(val) {

      var amount = parseInt(val.amount);

      // If the chosen amount is too high, reruns table
      if (amount > product.stock_quantity) {
        console.log("\nSorry, insufficient funds!");
        init();
      }
      else {
        // if amount is within the stock amount then make a purchase
        purchase(product, amount);
      }
    });
}

// Purchase the desired quanity of the desired item
function purchase(product, amount) {
  connection.query(
    "UPDATE products SET stock_number = stock_number - ? WHERE item_id = ?",
    [amount, product.item_id],
    function(err, res) {
      // Purchase was successful
      console.log("\nSuccessfully purchased " + amount + " " + product.product_name + "'s!");
      init();
    }
  );
}

// Function to check if item number is in inventory
function stockCheck(itemNumber, stock) {
  for (var i = 0; i < stock.length; i++) {
    if (stock[i].item_id === itemNumber) {
      // if id number exists, return the product
      return stock[i];
    }
  }
  // Otherwise return null
  return null;
}

