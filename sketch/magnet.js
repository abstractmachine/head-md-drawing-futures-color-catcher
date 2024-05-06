
function createMagnet(direction) {

    // create a visual magnet
    let magnet = new Magnet(direction);
    magnets.push(magnet);

}


class Magnet {

	constructor(direction) {

		this.size = 0;
		this.maxSize = width*0.35;
		this.growSpeed = random(8,10);
        this.active = true;
        this.hue = 0;
        this.saturation = 0;
        this.brightness = 100;

        // the directions are hexagonal
        switch(direction) {
            case 'e':
                this.angle = 0;
                break;
            case 'se':
                this.angle = 60;
                break;
            case 'sw':
                this.angle = 120;
                break;
            case 'w':
                this.angle = 180;
                break;
            case 'nw':
                this.angle = 240;
                break;
            case 'ne':
                this.angle = 300;
                break;
        }

        playSound(direction);
	}

	draw() {

        // if we're done growing
        if (this.size > this.maxSize) {
            this.active = false;
            return;
        }

        push();

        this.size += this.growSpeed;

        // draw an expanding line
        colorMode(HSB, 360, 100, 100, 100);
        noFill();

        let center = createVector(width*0.5, height*0.5);

        // create a line expanding out from edge of planet
        let x1 = center.x + (cos(radians(this.angle-30)) * this.size);
        let y1 = center.y + (sin(radians(this.angle-30)) * this.size);
        let x2 = center.x + (cos(radians(this.angle+30)) * this.size);
        let y2 = center.y + (sin(radians(this.angle+30)) * this.size);

        let intersectingSatellites = [];

        satellites.forEach((satellite) => {

            // make sure it isn't retreating
            if (satellite.rocketState !== RocketState.Hovering) return;

            let satPos = satellite.rocketPosition;

            let doesIntersect = intersects(center.x,center.y,satPos.x,satPos.y,x1,y1,x2,y2);
            if (doesIntersect) {
                intersectingSatellites.push(satellite);
                stroke(180, 100, 100, 100);
            } else {
                stroke(0, 100, 100, 100);
            }
            // line(center.x, center.y, satPos.x, satPos.y);

        });

        // if we have intersecting satellites, find the closest one
        if (intersectingSatellites.length > 0) {
            // calculate the closest satellite
            let closestSatellite = intersectingSatellites[0];
            let closestDistance = dist(center.x, center.y, closestSatellite.rocketPosition.x, closestSatellite.rocketPosition.y);
            intersectingSatellites.forEach((satellite) => {
                let distance = dist(center.x, center.y, satellite.rocketPosition.x, satellite.rocketPosition.y);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestSatellite = satellite;
                }
            }
            );


            // get the color of this satellite
            this.hue = closestSatellite.hue;
            this.saturation = closestSatellite.saturation;
            this.brightness = closestSatellite.brightness;

            setCatcherColorUsingIndex(closestSatellite.colorIndex);

            // attack with the closest satellite
            closestSatellite.rocketAttack();
            // make a sound
            playSound('collision');
            // all the other satellites retreat
            satellites.forEach((satellite) => {
                if (satellite != closestSatellite) {
                    satellite.repelRocket();
                }
            });

        }

        // push out from center
        colorMode(HSB, 360, 100, 100, 100);
        stroke(this.hue, this.saturation, this.brightness, 100);
        line(x1, y1, x2, y2);

        pop();

	}

}



function createWave() {

    // create a visual wave
    let wave = new Wave();
    waves.push(wave);

    // turn off the endgame
    endgame = false;

    // tell all the satellites to retreat
    satellites.forEach((satellite) => {
        satellite.repelRocket();
    });

    planetReset(0);

}


class Wave {

	constructor() {

		this.size = 0;
		this.maxSize = width;
		this.growSpeed = random(8,10);
        this.active = true;

        playSound('wave');

	}


	draw() {

        // if we're done growing
        if (this.size > this.maxSize) {
            this.active = false;
            return;
        }

        // grow the wave
        this.size += this.growSpeed;
        colorMode(HSB, 360, 100, 100, 100);
        // set the stroke color
        stroke(0, 0, 100, 100);
        noFill();
        // center the wave
        push();
        translate(width * 0.5, height * 0.5);
        // draw a circle
        // circle(0, 0, this.size);
        // draw a hexagon
        beginShape();
        for (let i=0; i<6; i++) {
            let x = cos(radians(90+(60*i))) * this.size;
            let y = sin(radians(90+(60*i))) * this.size;
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();

	}

}