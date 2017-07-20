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
	productSales();
});

function productSales(){
	inquirer.prompt([{
		type: "list",
		name: "options",
		message: "What would you like to do?",
		choices: [
			"View Product Sales By Department",
			"Create New Department",
			"Exit Session"]
	}]).then(function(answer){
		switch(answer.options){
			case "View Product Sales By Department":
				viewSaleDepartment();
				break;
			case "Create New Department":
				createNewDepartment();
				break;
			case "Exit Sesion":
				console.log("Closed");
		}
	});
};

function viewSaleDepartment(){
	connection.query("SELECT * FROM Departments", function(err, data){
		if (err) throw err;

		console.log();
		console.log("---------- View Product Sale by Department----------");
		console.log("--------------------------------------------------------------------------------------------------");
		for(var i= 0; i < data.length; i++){
			console.log("Department ID: " + data[i].department_id + " | " + "Department Name: " + data[i].department_name + " | " + "Over Head Cost: " + data[i].over_head_costs + " | " + "Product Sales: " + data[i].product_sales + " | " + "Total Profit: " + (data[i].total_profit - data[i].over_head_costs));
			console.log("--------------------------------------------------------------------------------------------------");
		}
	productSales();
	})
};

function createNewDepartment(){
	console.log();
	console.log("---------- Creating New Department ----------");
	const questions = [{
		type: "input",
		name: "DeptName",
		message: "Department Name: "
	},
	{
		type: "input",
		name: "overHeadCost",
		message: "Over Head Cost: ",
		default: 0

	},
	{
		type: "input",
		name: "productSales",
		message: "Product Sales: ",
		default: 0
	}];

	inquirer.prompt(questions).then(function(data){
		let insertQuery = "INSERT INTO Products (departmente_name, over_head_costs, product_sales) VALUES (?, ?, ?)";
		connection.query(insertQuery, [data.DeptName, data.overHeadCost, data.productSales], function(err, data){
			console.log("Department was Added!");
		});
		productSales();
	})
}