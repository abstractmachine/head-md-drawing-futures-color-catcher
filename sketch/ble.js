const serviceUuid = "85fa19a3-1000-4cd4-940c-3c038c9aa250";
const characteristicsUUID = {
    led: "85fa19a3-1001-4cd4-940c-3c038c9aa250",
    move: "85fa19a3-1003-4cd4-940c-3c038c9aa250",
};
let ledCharacteristic;
let moveCharacteristic;
let myBLE;
let connectButton;


function setupBLE() {

    // Create a p5ble object
    myBLE = new p5ble();

    // Create a 'Connect and Start Notifications' button
    connectButton = createButton("Connecter le catcher");
    connectButton.position(15, 15);
    connectButton.mousePressed(connectAndStartNotify);

    // ne fonctionne pas sans interaction utilisateur
    // TODO voir si une solution ici: https://stackoverflow.com/questions/55531254/web-bluetooth-bypass-pairing-screen
    //connectAndStartNotify();
}


function connectAndStartNotify() {
    // print("connectAndStartNotify");
    // Connect to a  device by passing the service UUID
    myBLE.connect(serviceUuid, gotCharacteristics);
}

//  A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
    if (error) console.log("error: ", error);
    //console.log(characteristics);
    for (let i = 0; i < characteristics.length; i++) {
        if (characteristics[i].uuid == characteristicsUUID.led) {
            ledCharacteristic = characteristics[i];
        } else if (characteristics[i].uuid == characteristicsUUID.move) {
            moveCharacteristic = characteristics[i];
            myBLE.startNotifications(moveCharacteristic, handleMove);
        } else {
            console.log("nothing");
        }
    }

    // hide the connect button
    connectButton.hide();

    myBLE.onDisconnected(onBleDisconnected);

}

function onBleDisconnected() {
    console.log('Disconnected');
    // show the connect button
    connectButton.show();

    // try to reconnect
    connectAndStartNotify();
}

// A function  that will be called once got characteristics
function handleMove(data) {
    // console.log("Move: ", data);
    moveValue = Number(data);

    // convert moveValue to direction
    let moveDirections = ['ne', 'e', 'se', 'sw', 'w', 'nw'];

    if (moveValue >= 0 && moveValue < moveDirections.length) {
        catcherGestureInput(moveDirections[moveValue]);
    }

}

// //  A function that toggles the LED
// function toggleLED() {
//     myBLE.read(ledCharacteristic, handleLED);
// }

// function handleLED(error, data) {
//     if (error) console.log("error:  ", error);
//     console.log("LED: ", data);
//     myBLE.write(ledCharacteristic, !data);
// }
