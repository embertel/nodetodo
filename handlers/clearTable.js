var querystring = require("querystring"),
    mysql = require("mysql"),
    QueryString = require("./parser.js");



function clearTable(response) {
    // quick and dirty way to delete table.
    console.log("Request handler 'clearTable' was called.");

    var HOST, USERNAME, PASSWORD, DATABASE;

    var connect_string_split = process.env.CLEARDB_DATABASE_URL.split(":");
    USERNAME = connect_string_split[1].split("//")[1];
    PASSWORD = connect_string_split[2].split("@")[0];
    HOST = connect_string_split[2].split("@")[1].split("/")[0];
    DATABASE = connect_string_split[2].split("@")[1].split("/")[1].split("?")[0];

    var connection = mysql.createConnection({
    host     : HOST,
    user     : USERNAME,
    password : PASSWORD,
    database : DATABASE
    });

    var sql = "DROP TABLE IF EXISTS tb01";

    query = connection.query(sql, function(err) {
        if (err) { throw err; }
    });

    console.log('Dropped tb01.');
    connection.end();
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Table deleted.");
    response.end();

}