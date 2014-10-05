var VELOCITY_RATIO = 200;
var xPrev, yPrev, timePrev;

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
			Meteor.methods({
				writeData: function(velocity, y) {
					var num = 196 * (velocity === 0 ? 1 : 0) + y * 32 + (velocity < 0 ? 0 : 1) * 16 + Math.abs(velocity); 
					var buff = new Buffer(1);
					buff.writeUInt8(num, 0);
					console.log(buff);
					arduino.write(buff);
				},
				
				logPosition: function(x, y) {
					var time = new Date().getMilliseconds();
					if (xPrev != undefined && yPrev != undefined && timePrev != undefined) {
						var xVelocity = VELOCITY_RATIO * Math.abs(x - xPrev) / (time - timePrev);
						if (xVelocity < 0) xVelocity = Math.max(xVelocity, -15);
						else xVelocity = Math.min(xVelocity, 15);
						var yVelocity = Math.min(15, VELOCITY_RATIO * Math.abs(y - yPrev) / (time - timePrev));
						if (yVelocity < 0) yVelocity = Math.max(yVelocity, -15);
						else yVelocity = Math.min(yVelocity, 15);
						console.log("X Velocity: " + xVelocity);
						console.log("Y Velocity: " + yVelocity);
						Meteor.call('writeData', xVelocity, 0);
						Meteor.call('writeData', yVelocity, 1);
					}
					xPrev = x;
					yPrev = y;
					timePrev = time;
				}
			});
		}	
	});
});
