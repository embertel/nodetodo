module.exports = function() {
	var handlers = {}
	handlers["/"] = require('./handlers/start');
	handlers["/start"] = require('./handlers/start');
	handlers["/addTask"] = require('./handlers/addTask');
	handlers["/clearTable"] = require('./handlers/clearTable');
	return handlers;
}