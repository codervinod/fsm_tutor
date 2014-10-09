var fsm_client = require('../fsm_client');
var client = new fsm_client('5436fc4be757d3b42a0aadd6');

client.on('power_on',function(err){
	console.log('power_on event');
});

client.on('power_off',function(err){
	console.log('power_off event');
});

client.on('print_job',function(err){
	console.log('print_job event');
});

client.on('print_done',function(err){
	console.log('print_done event');
});
