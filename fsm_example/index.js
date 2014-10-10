var fsm_client = require('../fsm_client');
var client = new fsm_client('54371fa57bf8817c2f34c7f4','a786c7fcc4ea4a8200251de3d59adea6');

client.on('power_on',function(err){
	console.log('power_on event');
	client.UpdateState('Power On');
});

client.on('power_off',function(err){
	console.log('power_off event');
	client.UpdateState('Power Off');
});

client.on('print_job',function(err){
	console.log('print_job event');
	client.UpdateState('Print Job');
});

client.on('print_done',function(err){
	console.log('print_done event');
	client.UpdateState('Print Done');
});
