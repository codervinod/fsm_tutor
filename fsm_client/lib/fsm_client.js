var redis = require('redis');
var util = require("util");
var EventEmitter = require('events').EventEmitter;

var defaultHost = '10.100.138.194';

function RestClient(client_id) {
	this.client_id = client_id;
	this.redisClient = redis.createClient(6379,defaultHost);
	this.redisClient.subscribe(this.client_id);

	this.redisClient.on("message",function(channel,message){
		var json_message = JSON.parse(message);
		this.emit(json_message.action);
	}.bind(this));
}

util.inherits(RestClient, EventEmitter);

module.exports = RestClient;