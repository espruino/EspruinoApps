# Knob Button

Use the Puck.js (v2) as an on-demand knob: rotate to the desired angle and press the button.  The angle of rotation will be advertised to any Bluetooth Low Energy receivers in range.

## Usage

Load the app onto the Puck.js (v2) and then:
- hold the Puck.js in a vertical position (ex: against a wall)
- rotate to the desired angle
- press the button
- observe the green LED flash
- observe BLE advertising packets with the angle of rotation data for ~5 seconds

## How it works

The Puck.js (v2) will wake on button press and read the accelerometer.  The angle of rotation will be calculated based on the accelerometer's X-axis and Y-axis readings.  The value is advertised as a JSON string in a manufacturer-specific data packet using the Espruino company code (0x590), for example:

    {angleOfRotation:123}

[Pareto Anywhere](https://www.reelyactive.com/pareto/anywhere/) open source IoT middleware will automatically interpret these packets using its [advlib-ble-manufacturers](https://github.com/reelyactive/advlib-ble-manufacturers) library which supports Espruino advertising packets.

Following a button press sequence, the Puck.js (v2) will return to low-power sleep, waking again on any subsequent button press.  It will also periodically advertise the name "Knob.js".

## Adapt the code

See the reelyActive's [Puck.js Development Guide](https://reelyactive.github.io/diy/puckjs-dev/) to load the source code in the Espruino IDE and adapt it to meet your needs!
