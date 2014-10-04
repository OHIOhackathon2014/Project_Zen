if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
		var SerialPort = serialport.SerialPort;
		var arduino = new SerialPort("/dev/ttyACM0", {
			baudrate: 9600
		});
		arduino.open(function(err) {
			if (err) {
				console.log("Failed to open: " + err);
			} else {
				console.log("Serial port open");
				arduino.write("Hello World!");
			}	
		});
  });
}
