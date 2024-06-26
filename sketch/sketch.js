// pointer to the canvas
let cnv;
// which planet we are currently showing
let planetIndex = 0;
// show the current state of the satellites
let showSatellites = false;
// 
let satelliteCount = 5;
//
let explosions = [];
let magnets = [];
let waves = [];
// 
let endgame = false;

function preload() {

    preloadSounds();

}

function setup() {

	// fullscreen canvas
	cnv = createCanvas(windowWidth, windowHeight);
	cnv.parent('#p5');

    setupSounds();
    setupBLE();

    colorMode(RGB,255,255,255,255);
    // background(255,255,255);
	background(0,0,0);

	colorMode(HSB, 360, 100, 100, 100);

    reset();

}


// if window resized
function windowResized() {

	// resize canvas
	resizeCanvas(windowWidth, windowHeight);

    planetResized();

}


function reset() {

    // erase everything in the satellite array
    satellites = [];

	// instatiate the satellites
	for(let i=0; i<satelliteCount; i++) {
		satellites.push(new Satellite(i));
	}

    loadPlanet();
    playSound('start');
    
}


// draw loop
function draw() {

	// clear the canvas with a black background with opacity
	colorMode(RGB, 255, 255, 255, 255);
	noStroke();
	fill(0,50);
    // background(255,255,255,255);
	rect(-1,-1,width+2,height+2);
    // background(255,255,255);

    drawPlanet();

	// for testing purposes
	// drawAlignement();

	// draw all the satellites
    if (!endgame) {

        satellites.forEach((satellite) => {
            satellite.move();
        });

        // draw all the satellites
        satellites.forEach((satellite) => {
            satellite.draw();
        });
        
    }

    // draw all the explosions
    explosions.forEach((explosion) => {
		explosion.draw();
	});

    // draw all the waves
    waves.forEach((wave) => {
        wave.draw();
    });

    // draw all magnets
    magnets.forEach((magnet) => {
        magnet.draw();
    });

    removeStragglers();
	
}


function removeStragglers() {

    // remove all the explosions that are not active
    explosions = explosions.filter((explosion) => explosion.active === true);

    // remove all the waves that are not active
    waves = waves.filter((wave) => wave.active === true);

    // remove all the magnets that are not active
    magnets = magnets.filter((magnet) => magnet.active === true);

}



function mousePressed() {
    // start the audio engine on user gesture
    userStartAudio();

    // Connect the catcher if not already by clicking anywhere
    if (connectButton.elt.style.display == '') {
        connectAndStartNotify();
    }
}


function keyPressed() {

    simulateCatcherWithKeyboard();

    if (key == 'p') {
        downloadPalette();
    }

}


// this helps us align the planet proportionally in the canvas
function drawAlignement() {

    // no stroke
    stroke(0,100,100);
    translate(width*0.5, height*0.5);
    line(-width*0.5, 0, width*0.5, 0);
    line(0, -height*0.5, 0, height*0.5);
    line(+width*0.165, -height*0.5, +width*0.165, height*0.5);
    line(-width*0.165, -height*0.5, -width*0.165, height*0.5);
    line(-width*0.5, -width*0.165, width*0.5, -width*0.165);
    line(-width*0.5, +width*0.165, width*0.5, +width*0.165);

}

function downloadPalette() {

    // get the svg element
    var svg = document.getElementById('planet')
    print(catcherColorIndexes)

    // Format date with local time (ex: 2024-05-13 14:30:00)
    var date = new Date();
    // Format the date and time manually
    let formattedDate = date.getFullYear() + '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
        ('0' + date.getDate()).slice(-2) + ' ' +
        ('0' + date.getHours()).slice(-2) + 
        ('0' + date.getMinutes()).slice(-2) + 
        ('0' + date.getSeconds()).slice(-2);

    // format a name with date, time and cda values (ex: 2024-05-13 14:30:00 Palette 002 850 070.svg)
    var name = formattedDate + ' Palette ' + catcherColorIndexes.map(i => possibleColors[i].cda).join(' ') + '.svg'

    // download the svg
    saveSvg(svg, name);
}

function saveSvg(svg, name) {

    // get the svg data
    var svgData = new XMLSerializer().serializeToString(svg);

    // create a blob
    var blob = new Blob([svgData], { type: "image/svg+xml" });

    // create a url from the blob
    var url = URL.createObjectURL(blob);

    // create a link
    var link = document.createElement("a");
    link.download = name;
    link.href = url;

    // click the link
    link.click();

    // remove the link
    URL.revokeObjectURL(url);

}