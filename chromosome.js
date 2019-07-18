function euclid(x1, y1, x2, y2) {
	return sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));
}

class Chromosome {
	constructor(dna) {
		this.position = createVector(width / 2, DIAMETER); // konum
		this.velocity = createVector(); // hız
		this.acceleration = createVector(); // ivme

		this.fitness = 0;
		if (arguments.length < 1) {
			this.dna = new DNA();
		} else  {
			this.dna = dna;
		}
		this.geneCounter = 0;
		
		this.targetHit = false; 

	}

	calcFitness() {
		let d = euclid(this.position.x, this.position.y, target.x, target.y);
		this.fitness = pow(1 / d, 2);
	}

	show() {
		fill(255, 0, 0);
		ellipse(this.position.x, this.position.y, DIAMETER, DIAMETER);
	}

	move() {
		if (!this.isHitTarget()) {
			this.applyForce(this.dna.genes[this.geneCounter]);
			this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
			
			this.velocity.add(this.acceleration);
			this.position.add(this.velocity);
			this.acceleration.mult(0);
		}
	}

	applyForce(f) {
		this.acceleration.add(f);
	}

	isHitTarget() {
		let state = this.targetHit;
		let d = euclid(this.position.x, this.position.y, target.x, target.y);
		if (d < DIAMETER) this.targetHit = true;
		else this.targetHit = false;
		if (!state && this.targetHit) hitScore++;
		return this.targetHit;
	}

	getFitness() {
		return this.fitness;
	}
}