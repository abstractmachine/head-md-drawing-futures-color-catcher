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

    setupPlanet();
    setupSounds();

	colorMode(HSB, 360, 100, 100, 100);
	background(0,0,0,100);

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

    planetReset();
    playSound('start');
    
}


// draw loop
function draw() {

	// clear the canvas with a black background with opacity
	colorMode(RGB, 255, 255, 255, 255);
	noStroke();
	fill(0,50);
	rect(-1,-1,width+2,height+2);

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
}


function keyPressed() {

    simulateCatcherWithKeyboard();

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
