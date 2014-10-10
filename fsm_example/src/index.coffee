fsm_client = require('fsm_client')
NodeState = require('node-state')

client = new fsm_client '5437659ddb82151b63d47c7c','0945b2257f2319be3d2ee34ebe3e9c6c', host:'127.0.0.1'

class DfeStateMachine extends NodeState
  states:
    Off:
      Enter: (data)->
        client.UpdateState('Off')
        console.log 'Entered Off State'

      power_on: (data)->
        @goto 'Idle'

    Idle:
      Enter: (data)->
        client.UpdateState('Idle')
        console.log 'Entered Idle State'

      print_job: (data)->
        @goto 'Printing'

      power_off: (data)->
        @goto 'Off'

    Printing:
      Enter: (data)->
        client.UpdateState('Printing')
        console.log 'Entered Printing State'

      print_done: (data)->
        @goto 'Idle'

      power_off: (data)->
        @goto 'Off'

fsm = new DfeStateMachine
  autostart: true
  initial_state: 'Off'

client.on 'printer_event', (event_data)->
  fsm.raise event_data.action
