var redis = require('redis');
var util = require("util");
var request = require('request');
var EventEmitter = require('events').EventEmitter;

var defaultHost = '10.100.138.194',
    defaultApiVersion = 'api/v1';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

request.defaults({
    strictSSL: false, // allow us to use our self-signed cert for testing
    rejectUnauthorized: false
});

function RestClient(client_id,client_secret,options) {
	this.client_id = client_id;
	this.client_secret = client_secret;
	options = options || {};
	this.host = options.host || defaultHost;
    this.apiVersion = options.apiVersion || defaultApiVersion;

	this.redisClient = redis.createClient(6379,defaultHost);
	this.redisClient2 = redis.createClient(6379,defaultHost);
	this.redisClient.subscribe(this.client_id);

	this.redisClient.on("message",function(channel,message){
		var json_message = JSON.parse(message);
		this.emit(json_message.action);
	}.bind(this));
}

util.inherits(RestClient, EventEmitter);

RestClient.prototype.getBaseUrl = function () {
    return 'https://' + this.client_id + ':' + this.client_secret + '@' + this.host + '/' + this.apiVersion;
};

RestClient.prototype.UpdateState = function(new_state){
	//request.post(this.getBaseUrl()+'/updateState',{form:{new_state:new_state}});
	this.redisClient2.set(this.client_id +'_state',new_state);
}

module.exports = RestClient;