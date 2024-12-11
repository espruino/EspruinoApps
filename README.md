Espruino App Loader (and Apps)
==============================

[![Build Status](https://github.com/espruino/EspruinoApps/actions/workflows/nodejs.yml/badge.svg)](https://github.com/espruino/EspruinoApps/actions/workflows/nodejs.yml)

<!-- * Try the **release version** at [espruino.com/apps](https://espruino.com/apps) -->
* Try the **development version** at [github.io](https://espruino.github.io/EspruinoApps/)

**All software (including apps) in this repository is MIT Licensed - see [LICENSE](LICENSE)** By
submitting code to this repository you confirm that you are happy with it being MIT licensed,
and that it is not licensed in another way that would make this impossible.

## How does it work?

* Apps are in the `apps` folder, and each app has `metadata.json` file describing it (the `id` must match the folder name)
* When it starts, EspruinoAppLoader checks the JSON and compares
it with the files it sees in storage.
* To upload an app, EspruinoAppLoader checks the files that are
listed in `metadata.json`, loads them, and sends them over Web Bluetooth.

This is a cut-down version of what's used in https://banglejs.com/apps
for Bangle.js apps, so much of the advice in https://github.com/espruino/BangleApps/blob/master/README.md
applies.

**However** because we're only handling one app at a time, we don't write the app
into a file called `appid.app.js`, but instead into `.bootcde` which is the file
that the Espruino writes into when writing "To Flash" (for more info see https://www.espruino.com/Saving)

## Credits

The majority of icons used for these apps are from [Icons8](https://icons8.com/) - we have a commercial license but icons are also free for Open Source projects.
