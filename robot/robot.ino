// Use this code to test your motor with the Arduino board:

// if you need PWM, just use the PWM outputs on the Arduino
// and instead of digitalWrite, you should use the analogWrite command

// Bit masks for commands
#define AXIS 0x08
#define ACTION 0x04
#define DIRECTION_ALL 0x02
#define DIRECTION_BACK 0x01

// Motor pins
int motor_y[] = {2, 3};
int motor_x[] = {7, 8};

void setup() {
  Serial.begin(9600);

  // Setup motors
  int i;
  for (i = 0; i < 2; i++) {
    pinMode(motor_y[i], OUTPUT);
    pinMode(motor_x[i], OUTPUT);
  }

  motor_stop_all();
}

void loop() {
  if (Serial.available()) {
    uint8_t command[2];
    Serial.readBytes(command, 2);
    
    if (command[1] & ACTION) {
      // Stop  the entire Axis
      if (command[1] & AXIS) {
        motor_y_stop();
      } else {
        motor_x_stop();
      }
    } else {
      // Move the axis in some direction
      if (command[1] & DIRECTION_BACK) {
        // Move axis backwards
        if (command[1] & AXIS) {
          motor_y_backwards(command[2]);
        } else {
          motory_x_backwards(command[2]);
        }
      } else {
        // Move axis forward
        if (command[1] & AXIS) {
          motor_y_forwards(command[2]);
        } else {
          motory_x_forwards(command[2]);
        }
      }
    }
  } else {
    motor_stop_all();
  }
}

void motor_stop_all() {
  motor_y_stop();
  motor_x_stop();
  delay(25);
}

void motor_y_stop() {
  digitalWrite(motor_y[0], LOW);
  digitalWrite(motor_y[1], LOW);
}

void motor_x_stop() {
  digitalWrite(motor_x[0], LOW);
  digitalWrite(motor_x[1], LOW);
}

void motor_y_forward() {
  digitalWrite(motor_y[0], HIGH);
  digitalWrite(motor_y[1], LOW);
}

void motor_y_backwards() {
  digitalWrite(motor_y[0], LOW);
  digitalWrite(motor_y[1], HIGH);
}

void motor_x_forward() {
  digitalWrite(motor_y[0], HIGH);
  digitalWrite(motor_y[1], LOW);
}

void motor_x_backwards() {
  digitalWrite(motor_y[0], LOW);
  digitalWrite(motor_y[1], HIGH);
}

