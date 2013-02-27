var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/addTask"] = requestHandlers.addTask;
handle["/clearTable"] = requestHandlers.clearTable;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);