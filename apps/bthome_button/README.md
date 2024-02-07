# BTHome Button

On a Bluetooth LE device, this advertises temperature and battery in a [BTHome (https://bthome.io/)](https://bthome.io/) compatible format, which can then be used in https://www.home-assistant.io/

When you press the button, a 'button event' will be advertised which can be used to trigger tasks in https://www.home-assistant.io/.

It reports `press` for a short press, or `long_press` for pressing over 0.5s

This is based on https://www.espruino.com/BTHome

## Usage

Install the app and disconnect - no configuration is needed.
