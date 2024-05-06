
let sounds = {
	'start': null,
	'gameover': null,
	'wave': null,
	'invert-magnet-e': null,
	'invert-magnet-se': null,
	'invert-magnet-sw': null,
	'invert-magnet-w': null,
	'invert-magnet-nw': null,
	'invert-magnet-ne': null,
	'collision-0': null,
	'explosion-0': null,
};

function preloadSounds() {

	// go through the keys in the sounds object
	for (let key in sounds) {
		// load the sound file
		sounds[key] = loadSound(`assets/sounds/${key}.wav`);
	}

}

function setupSounds() {



}

function playSound(name) {

	// play all the sounds according to their name
	switch (name) {
		case 'start':
			sounds['start'].play();
			break;
		case 'gameover':
			sounds['gameover'].play();
			break;
		case 'e':
			sounds['invert-magnet-e'].play();
			break;
		case 'se':
			sounds['invert-magnet-se'].play();
			break;
		case 'sw':
			sounds['invert-magnet-sw'].play();
			break;
		case 'w':
			sounds['invert-magnet-w'].play();
			break;
		case 'nw':
			sounds['invert-magnet-nw'].play();
			break;
		case 'ne':
			sounds['invert-magnet-ne'].play();
			break;
		case 'wave':
			sounds['wave'].play();
			break;
		case 'collision':
			sounds['collision-0'].play();
			break;
		case 'explosion':
			sounds['explosion-0'].play();
			break;
		default:
			break;
	}

}