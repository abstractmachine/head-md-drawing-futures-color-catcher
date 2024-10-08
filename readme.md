# Color Catcher

This is the code for the [ColorCatcher](https://github.com/SarahM1236/head-md-future-of-drawing/) project. It is part of the larger exhibition [Drawing Futures](https://github.com/abstractmachine/head-md-future-of-drawing/tree/main/expo).

## Dependencies

This project uses the [P5.js](https://p5js.org) library. It uses [Snap SVG](http://snapsvg.io) for its SVG tools.

## Run from VS Code

Open folder in VS Code. Right-click on `index.html` and select `Open Wth Live Server`.

This requires the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code.

## Run from Command-line

See or use colorCatcherKiosk.command for kiosk mode

## Interface with Catcher hardware

The back <> forth communication with the hardware device via BLE is being handled by [Pierre Rossel](https://github.com/prossel). The boilerplate code to handle this back <> forth is in `code/p5/catcher/sketch/catcher.js`.

For now we can simulate with the keyboard the incoming six gestures (e, se, sw, w, nw, ne) as well as the reset gesture (to be determined). We have also created two outgoing messages: `resetCatcher()` & `setCatcherColorUsingIndex()`.

## Sound Permissions

Using Chrome, you can automatically authorize sound for `localhost:####` (5000, 5050, etc).

`Chrome` > `Settings` > `Privacy and Security` > `Site Settings` > `127.0.0.1` > `Sound` > `Allow`

For this local IP to appear, you need to have previously given permission.

## SVG Export

To export from Illustrator:
`Menu` > `File` > `Export As` > `SVG (svg)` > `Export`

### SVG Options

- Styling: `Inline Style`
- Object IDs: `Unique`
- Minify: `False`
- Responsive: `False`
