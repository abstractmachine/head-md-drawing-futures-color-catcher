let shapes;
let planetContainer;
let planetDimensions = { width: 0, height: 0 };
let neutralColor = "#d0d0d0";
let coreColor = "#d0d0d0";
let svgRect = null;
let coreRatio = 0.35;
let filepaths = ["assets/images/shape-0.svg"];
// let filepaths = ['assets/tester.svg'];

function setupPlanet() {

	loadPlanet(0);

}


function planetResized() {

	svgRect = document.getElementById('planet').getBoundingClientRect();
	
}


function loadPlanet(index) {

	planetContainer = Snap("#planet-container");
	snap = Snap.load(filepaths[index], onPlanetLoaded);

}


function planetReset(index = 0) {

	planetIndex = index;

	coreColor = neutralColor.toString();

	// go through all the shapes in the svg
	planetContainer.selectAll('path').forEach((shape) => {
		colorPlanetSegment(shape, coreColor)
	});

	resetCatcher();

}


function drawPlanet() {

	if (svgRect == null) {
		return;
	}

	// set core colors
	colorMode(RGB, 255, 255, 255, 255);
	fill(coreColor);
	stroke(coreColor);
	// draw a circle at the center of the planet
	circle(width * 0.5, height * 0.5, svgRect.width * coreRatio);

}


function gameOver() {

    console.log("Game Over!");

    playSound('gameover');

    endgame = true;

}


function colorRandomNeighbour(colorString) {

	let result = false;

	// go through all the shapes in the svg
	planetContainer.selectAll('path').forEach((shape) => {

        let currentColor = shape.node.attributes.fill.value;

        // if the color is the same as neutral, we can color it
        if (currentColor === neutralColor) {
            colorPlanetSegment(shape, colorString);
            // console.log("coloring neighbor");
            result = true;
            return;
        }

    });

    return result;

}


function checkNeighbours(pathOfIntersection, colorString) {

	let result = false;

	// go through all the shapes in the svg
	planetContainer.selectAll('path').forEach((shape) => {

		// if we already found a neighbor, we can stop
		if (result) {
			return;
		}
		// don't test with yourself
		if (pathOfIntersection == shape) {
			return;
		}
		let intersectionPath = Snap.path.intersection(pathOfIntersection, shape);
		if (intersectionPath.length > 0) {

			let currentColor = shape.node.attributes.fill.value;

			// if the color is the same as neutral, we can color it
			if (currentColor === neutralColor) {
				colorPlanetSegment(shape, colorString);
				// console.log("coloring neighbor");
				result = true;
				return;
			}

		}

	}); // forEach(shape)

	// did we find a neutral neighbor?
	return result;

}


function onPlanetLoaded(data) {

	shapes = [];

	let g = data.selectAll("path,circle,rect,polygon,ellipse");
	g.forEach(function (e) {
		e.attr({ fill: neutralColor });
		e.attr({ stroke: neutralColor });
		e.attr({ strokeWidth: 10 });
		shapes.push(e);
	});
	planetContainer.append(data);

	let childSvg = planetContainer.select("svg");
	if (childSvg) {
		childSvg.node.id = 'planet';
		planetDimensions.width = childSvg.node.width.baseVal.value;
		planetDimensions.height = childSvg.node.height.baseVal.value;
	}

	planetResized();

}


function isPointInside(pt) {

	let intersection = null;
	
	// first, get the normalized mouse position inside the svg element
	let x = (pt.x - svgRect.x) / svgRect.width;
	let y = (pt.y - svgRect.y) / svgRect.height;

	// if this is not inside the svg element, return null
	if (x < 0 || x > 1 || y < 0 || y > 1) {
		return null;
	}

	// expand the range to the svg element
	x = map(x, 0, 1, 0, planetDimensions.width);
	y = map(y, 0, 1, 0, planetDimensions.height);

	let s = Snap("#planet-container");
	let paths = s.selectAll('path'); // select all path elements
	paths.forEach((path) => {
		let d = path.attr('d')
		let isInside = false;
		isInside = Snap.path.isPointInside(d, x, y);
		if (isInside) {
			intersection = path;
			return; // Exit the current iteration of the loop
		}
	});

	return intersection;
}


function colorPlanetSegment(segment, couleur) {

	segment.attr({ 'fill': couleur });
	segment.attr({ 'stroke': couleur });

}
