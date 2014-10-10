var fsm_client = require('../fsm_client');
var client = new fsm_client('5437659ddb82151b63d47c7c','0945b2257f2319be3d2ee34ebe3e9c6c');

client.on('printer_event',function(event_data){
	console.log('event_Data=',event_data);
	switch(event_data.action){
		case 'power_on':client.UpdateState('Power On');
			break;
		case 'power_off':client.UpdateState('Power Off');
			break;
		case 'print_job':client.UpdateState('Print Job');
			break;
		case 'print_done':client.UpdateState('Print Done');
			break;
	}
});
