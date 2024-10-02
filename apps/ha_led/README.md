# Home Assistant Bluetooth LED

Turn your Bluetooth Espruino device into a LED that can be controlled from Home assistant.

This uses the [LED BLE Library](https://www.espruino.com/ble_led) which makes Espruino appear as a BLE lightbulb which
is detected by the [LED BLE integration](https://www.home-assistant.io/integrations/led_ble/) in https://www.home-assistant.io/

This is based on https://www.espruino.com/BTHome and https://www.espruino.com/Smart+Meter

## Usage

Install the app and disconnect, and a device called `LEDBLE` should appear in Home Assistant. Turning it on/off or changing the colour will change the built-in LEDs.