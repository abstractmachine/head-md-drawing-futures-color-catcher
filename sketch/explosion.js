
// create a class of explosion
class Explosion {

	// constructor of the class
	constructor(x, y, hue, sat, bright) {
		this.x = x;
		this.y = y;
		this.size = 0;
		this.maxSize = random(200,300);
		this.growSpeed = random(5,10);
		this.active = true;
		this.hue = hue;
		this.sat = sat;
		this.bright = bright;
	}

	// draw the explosion
	draw() {

		if (this.size < this.maxSize) {
			this.size += this.growSpeed;
		} else {
			this.active = false;
		}
		colorMode(HSB, 360, 100, 100, 100);
		// set the stroke color
		stroke(this.hue, this.sat, this.bright, 100);
		noFill();
		// draw an arc
		push();
		translate(this.x, this.y);
		circle(0, 0, this.size);
		pop();
		
	}

}