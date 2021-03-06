var querystring = require("querystring"),
    mysql = require("mysql"),
    QueryString = require("./parser.js");

module.exports = function (response) {
    // generates main page with todo list and submission form.
    console.log("Request handler 'start' was called.");

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

    // create table
    var sql = ""+
    "CREATE TABLE IF NOT EXISTS tb01("+
    " ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,"+
    " actionItem char(140)"+
    ");";
    query = connection.query(sql, function(err) {
    if (err) { throw err; }
    });
    console.log('table tb01 is created.');

    var todoList;
    query = connection.query('SELECT * FROM tb01',
        function(err, result, fields) {
        if (err) throw err;
        else {
            todoList = '<html>'+
            '<head>'+
            '<meta http-equiv="Content-Type" '+
            'content="text/html; charset=UTF-8" />'+
            // until I can get Heroku to compile a stylesheet, this will have to be remote...
            '<link rel="stylesheet" type="text/css" href="http://www.emilybertelson.com/todostyle.css"/>' +
            '<title>nodetodo</title>'+
            '</head>'+
            '<body>' +
            '<div id="listAndSubmit">'+
            '<form name="todoList">'+
            '<h1>nodetodo</h1>';

            // make list items
            for(var index in result) {
                var item = result[index].actionItem;
                todoList += '<input type="checkbox" name="box' + index + '">' + item + '<br>';
            }
            // TODO: implement means of deleting items via checkboxes
            //       and/or make checking boxes more satisfying
            todoList += '</form>' +
            '<form name="addTask" action="addTask" method="post">' +
            'What needs to get done?' +
            '<input type="text" name="task"><br>' +
            '<input type="submit" value="Add" />' +
            '</form>' +
            '</div>' +
            '</body>'+
            '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(todoList);
    response.end();
            }
        }
    );
    connection.end();
}
