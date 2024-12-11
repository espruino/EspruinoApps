# BTHome Rotation

This advertises temperature, battery and rotation in a [BTHome (https://bthome.io/)](https://bthome.io/) compatible format, which can then be used in https://www.home-assistant.io/

There are two rotations advertised, for the X and Y axes. When the Puck.js is completely flat on a desk (aerial up, button down) a value of `0,0` will be reported, and will vary +/- 180 degrees. Rotation updates once per minute.

This is based on https://www.espruino.com/BTHome


## Usage

Install the app and disconnect, then Puck.js will appear in Home Assistant as a new device
