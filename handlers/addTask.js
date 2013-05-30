var querystring = require("querystring"),
    mysql = require("mysql"),
    QueryString = require("./parser.js");

var finish = function(response) {
    request.on('end', function() {
        // redirect to main page with html. There's surely a less coarse way to do this...
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write('<meta http-equiv="REFRESH" content="0;url=/start">');
        response.end();
    });
}

function addTask(response, request) {
    // handles POST data submission
    console.log("Request handler 'addTask' was called.");
    if(request.method == 'POST') {
        console.log("Method " + request.method);
        request.on('data', function(chunk) {
            // making use of a nice parser by Jan Wolter here.
            var qs = new QueryString(chunk.toString());

            var fullBody = qs.value('task');
            if(fullBody === '') {
                finish(response);
                return;
            }

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

            // TODO: look into security issues (sql injection attacks?)
            var query = connection.query('INSERT INTO tb01(actionItem) VALUES ("'+ fullBody +'")',
            function(err, result, fields) {
                if (err) throw err;
            });
            connection.end();
        });
        
        finish(response);
    }
}