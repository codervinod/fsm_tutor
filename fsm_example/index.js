// Generated by CoffeeScript 1.7.1
(function() {
  var DfeStateMachine, NodeState, client, fsm, fsm_client,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  fsm_client = require('fsm_client');

  NodeState = require('node-state');

  client = new fsm_client('5437659ddb82151b63d47c7c', '0945b2257f2319be3d2ee34ebe3e9c6c', {
    host: '127.0.0.1'
  });

  DfeStateMachine = (function(_super) {
    __extends(DfeStateMachine, _super);

    function DfeStateMachine() {
      return DfeStateMachine.__super__.constructor.apply(this, arguments);
    }

    DfeStateMachine.prototype.states = {
      Off: {
        Enter: function(data) {
          client.UpdateState('Off');
          return console.log('Entered Off State');
        },
        power_on: function(data) {
          return this.goto('Idle');
        }
      },
      Idle: {
        Enter: function(data) {
          client.UpdateState('Idle');
          return console.log('Entered Idle State');
        },
        print_job: function(data) {
          return this.goto('Printing');
        },
        power_off: function(data) {
          return this.goto('Off');
        }
      },
      Printing: {
        Enter: function(data) {
          client.UpdateState('Printing');
          return console.log('Entered Printing State');
        },
        print_done: function(data) {
          return this.goto('Idle');
        },
        power_off: function(data) {
          return this.goto('Off');
        }
      }
    };

    return DfeStateMachine;

  })(NodeState);

  fsm = new DfeStateMachine({
    autostart: true,
    initial_state: 'Off'
  });

  client.on('printer_event', function(event_data) {
    return fsm.raise(event_data.action);
  });

}).call(this);
