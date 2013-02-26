var querystring = require("querystring"),
    mysql = require("mysql"),
    QueryString = require("./parser.js");

function start(response) {
    // generates main page with todo list and submission form.
    // console.log("Request handler 'start' was called.");

    var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'db01'
    });
    var todoList;
    var query = connection.query('SELECT * FROM tb01',
        function(err, result, fields) {
        if (err) throw err;
        else {
            todoList = '<html>'+
            '<head>'+
            '<meta http-equiv="Content-Type" '+
            'content="text/html; charset=UTF-8" />'+
            '<link rel="stylesheet" type="text/css" href="todostyle.css"/>' +
            '<title>What\'s to do?</title>'+
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

function addTask(response, request) {
    // handles POST data submission
    // console.log("Request handler 'addTask' was called.");
    if(request.method == 'POST') {
        console.log("Method " + request.method);
        request.on('data', function(chunk) {
            // making use of a nice parser by Jan Wolter here.
            var qs = new QueryString(chunk.toString());
            var fullBody = qs.value('task');

            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : 'root',
                database : 'db01'
            });

            // TODO: protect against sql injection attacks
            var query = connection.query('INSERT INTO tb01(date, actionItem) VALUES ("2013-02-21","'+ fullBody +'")',
            function(err, result, fields) {
                if (err) throw err;
                // else console.log(result);
            });
            connection.end();
        });

        request.on('end', function() {
            // redirect to main page with html. There's surely a less coarse way to do this...
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write('<meta http-equiv="REFRESH" content="0;url=/start">');
            response.end();
        });
    }
}

exports.start = start;
exports.addTask = addTask;