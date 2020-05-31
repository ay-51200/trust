var mysql       = require('mysql');
var constant	= require('./constant');


var connection  = mysql.createConnection({
		host     : constant.HOST_NAME,
		user     : constant.USER_NAME,
		password : constant.PASSWORD,
		database : constant.DATABASE_NAME
});


connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;