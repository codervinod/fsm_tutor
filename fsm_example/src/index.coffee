fsm_client = require('fsm_client')
NodeState = require('node-state')

client = new fsm_client '5437798eb1ccba382805dbf4','0e2c95597f3ac063e0be29767550a687'

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
