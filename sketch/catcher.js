let catcherColorIndexes = [];

function simulateCatcherWithKeyboard() {

    // this is the "I want to start over gesture"
    // either shake like a wet dog, or maybe shake up/down like a soda can
    if (keyCode == 32) {
        catcherWaveInput();
    }

    // these are the six directional movements
    switch (keyCode) {
        case 102: // nw
            catcherGestureInput('e');
            break;
        case 99: // ne
            catcherGestureInput('se');
            break;
        case 97: // w
            catcherGestureInput('sw');
            break;
        case 100: // e
            catcherGestureInput('w');
            break;
        case 103: // sw
            catcherGestureInput('nw');
            break;
        case 105: // se
            catcherGestureInput('ne');
            break;
        default:
            break;
    }

    // these are the six directional movements
    switch (key) {
        case 'a': // e
        case '2':
            catcherGestureInput('e');
            break;
        case 'b': // se
        case '3':
            catcherGestureInput('se');
            break;
        case 'c': // sw
        case '4':
            catcherGestureInput('sw');
            break;
        case 'd': // w
        case '5':
            catcherGestureInput('w');
            break;
        case '6': // nw
            catcherGestureInput('nw');
            break;
        case 'f': // ne
        case '1':
            catcherGestureInput('ne');
            break;
        default:
            break;
    }

}

function catcherGestureInput(direction) {

    switch (direction) {
        case 'e':
            createMagnet('e');
            break;
        case 'se':
            createMagnet('se');
            break;
        case 'sw':
            createMagnet('sw');
            break;
        case 'w':
            createMagnet('w');
            break;
        case 'nw':
            createMagnet('nw');
            break;
        case 'ne':
            createMagnet('ne');
            break;
        default:
            break;

    }

}

function catcherWaveInput() {
    createWave();
}

function resetCatcher() {

    // send reset code to Catcher
    //catcherSerial.write('x');
    //catcherSerial.write('\n');

    catcherIndex = -1;
    catcherColorIndexes = [];

    if (paletteCharacteristic) {
        paletteCharacteristic.writeValue(new Uint8Array(4 * 3))
    }
}


function setCatcherColorUsingIndex(colorIndex) {

    // ignore if not connected
    if (!paletteCharacteristic) return

    if (catcherColorIndexes.length < 4) {
        catcherColorIndexes.push(colorIndex);
        console.log('catcherColorIndexes: ' + catcherColorIndexes);

        // all colors are black by default
        var palette = new Uint8Array(4 * 3)

        // set the color already catched
        catcherColorIndexes.forEach((colorIndex, i) => {
            let colorHue = possibleColors[colorIndex].hue;
            let colorSaturation = possibleColors[colorIndex].saturation;
            let colorBrightness = possibleColors[colorIndex].brightness;
            let rgb = hsvToRgb(colorHue / 360.0, colorSaturation / 100.0, colorBrightness / 100.0);
            let r = rgb[0];
            let g = rgb[1];
            let b = rgb[2];
            palette[i * 3 + 0] = r
            palette[i * 3 + 1] = g
            palette[i * 3 + 2] = b
        })

        // log data in hex format
        console.log('palette: ' + Array.from(palette).map(byte => byte.toString(16).padStart(2, '0')).join(' '));

        // send the palette to Catcher
        paletteCharacteristic.writeValue(palette)
    }

} 