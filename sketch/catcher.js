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
        case 'a': // nw
            catcherGestureInput('e');
            break;
        case 'b': // ne
            catcherGestureInput('se');
            break;
        case 'c': // w
            catcherGestureInput('sw');
            break;
        case 'd': // e
            catcherGestureInput('w');
            break;
        case 'e': // sw
            catcherGestureInput('nw');
            break;
        case 'f': // se
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

}


function setCatcherColorUsingIndex(colorIndex) {

    if (catcherColorIndexes.length < 4) {
        catcherColorIndexes.push(colorIndex);
        console.log('catcherColorIndexes: ' + catcherColorIndexes);
    }


    // send color code to Catcher device

    // convert hsv to rgb
    // let colorHue = possibleColors[colorIndex].hue;
    // let colorSaturation = possibleColors[colorIndex].saturation;
    // let colorBrightness = possibleColors[colorIndex].brightness;
    // let rgb = hsvToRgb(colorHue / 360.0, colorSaturation / 100.0, colorBrightness / 100.0);
    // let r = rgb[0];
    // let g = rgb[1];
    // let b = rgb[2];
    //catcherSerial.write('c');
    //catcherSerial.write(catcherIndex.toString());
    //catcherSerial.write(r.toString());
    //catcherSerial.write(g.toString());
    //catcherSerial.write(b.toString());
    //catcherSerial.write('\n');

} 