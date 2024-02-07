# BTHome Door Sensor

On a Bluetooth LE device, this advertises temperature and battery in a [BTHome (https://bthome.io/)](https://bthome.io/) compatible format, which can then be used in https://www.home-assistant.io/

If you attach a Puck.js running this code near a door, and then put a magnet on the door such that it's near the Puck when the door is closed, this will fire a `long_press` button event to Home Assistant and flash the red LED
when the door is opened, and a `press` event (and green flash) when it is closed.

This is based on https://www.espruino.com/BTHome and https://www.espruino.com/Puck.js+Door+Light


## Usage

Install the app and disconnect, then place the Puck.js running this code near a door (on the door frame), and then put a magnet on the door such that it's near the Puck when the door is closed
