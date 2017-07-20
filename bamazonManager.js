var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});

connection.connect(function(err){
	if(err) throw err;
	updateQuery();
});

function updateQuery(){
	inquirer.prompt([{
		type: "list",
		name: "menu",
		message: "What would you like to do?",
		choices: [
			"View Products for Sale",
			"View Low Inventory",
			"Add to Inventory",
			"Add New Product",
			"Exit Session"]
	}]).then(function(answer){
		switch(answer.menu) {
			case "View Products for Sale":
				viewProductSale();
				break;
			case "View Low Inventory":
				viewLowInventory();
				break;
			case "Add to Inventory":
				addInventory();
				break;
			case "Add New Product":
				addNewProduct();
				break;
			case "Exit Session":
				console.log("Closed");
		}
	});
};

function viewProductSale(){
	connection.query("SELECT * FROM Products", function(err, data){
		if(err) throw err;

		console.log();
		console.log("---------- View Product Sale ----------");
		console.log("--------------------------------------------------------------------------------------------------");
		for(var i= 0; i < data.length; i++){
			console.log("Item ID: " + data[i].item_id + " | " + "Product Name: " + data[i].product_name + " | " + "Department Name: " + data[i].department_name + " | " + "Price: " + data[i].price + " | " + "Stock Quantity: " + data[i].stock_quantity);
			console.log("--------------------------------------------------------------------------------------------------");
		}
	updateQuery();
	});
};

function viewLowInventory(){
	connection.query("SELECT * FROM Products", function(err, data){
		if(err) throw err;

		console.log();
		console.log("---------- View Low Inventory ----------");
		console.log("--------------------------------------------------------------------------------------------------");
		for(var i= 0; i < data.length; i++){
			if (data[i].stock_quantity <= 5){
				console.log("Item ID: " + data[i].item_id + " | " + "Product Name: " + data[i].product_name + " | " + "Department Name: " + data[i].department_name + " | " + "Price: " + data[i].price + " | " + "Stock Quantity: " + data[i].stock_quantity);
				console.log("--------------------------------------------------------------------------------------------------");	
			}
		}
	updateQuery();
	});
};

function addInventory(){
	console.log();
	console.log("---------- Add to Inventory ----------");
	connection.query("SELECT * FROM Products", function(err, data){
		if(err) throw err;
		var itemsArray = [];
		for (i = 0; i < data.length; i++){
			itemsArray.push(data[i].product_name);
		}
		inquirer.prompt([{
			type: "list",
			name: "products",
			choices: itemsArray,
			message: "Which one items would you like to add to Inventory?"
		},
		{
			type: "input",
			name: "quantity",
			message: "How many would you like to add the Quantity?",
			validate: function(value){
				if (isNaN(value) === false){
					return true;
				}
				return false;
			}
		}]).then(function(answer){
			var currentQty;
			for(i=0; i < data.length; i++){
				if(data[i].product_name === answer.products){
					currentQty = data[i].stock_quantity;
				}
			}
			connection.query("UPDATE Products SET ? WHERE ? ", [{stock_quantity: currentQty + parseInt(answer.quantity)}, {product_name: answer.products}], function(err, data){
				if (err) throw err;
				console.log("The quantity was update!");
				updateQuery();				
			});
		});
	});
};

function addNewProduct(){
	console.log();
	console.log("---------- Add to Inventory ----------");

	const questions = [{
		type: "input",
		name: "product",
		message: "Product Name: "
	},
	{
		type: "input",
		name: "department",
		message: "Department Name: "

	},
	{
		type: "input",
		name: "price",
		message: "Price: "
	},
	{
		type: "input",
		name: "quantity",
		message: "Stock Quantity: "
	}];

	inquirer.prompt(questions).then(function(data){
		let insertQuery = "INSERT INTO Products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)";
		connection.query(insertQuery, [data.product, data.department, data.price, data.quantity], function(err, data){
			console.log("Products Added!");
		});
		updateQuery();
	})
}
