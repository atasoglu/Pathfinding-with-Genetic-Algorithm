class Population {
	constructor(popsize, mutationRate) {
		
		this.mutationRate = mutationRate;
		this.matingPool = [];
		this.generation = 1;
		
		this.population = [];
		for (let i = 0; i < popsize; i++) {
			this.population[i] = new Chromosome();
		}


	}

	run() {
		for (let i = 0; i < this.population.length; i++) {
			this.population[i].move();
			this.population[i].show();
		}
	}

	calcFitness() {
		for (let i = 0; i < this.population.length; i++) {
			this.population[i].calcFitness();
		}
	}

	naturalSelection() {
		this.matingPool = [];
		let maxFitness = this.getMaxFitness();
		for (let i = 0; i < this.population.length; i++) {
			let fitnessNormal = map(this.population[i].getFitness(), 0, maxFitness, 0, 1);
			let n = floor(fitnessNormal * 100);
			for (let j = 0; j < n; j++) {
				this.matingPool.push(this.population[i]);
			}
		}
	}

	generate() {
		let partnerA, partnerB, indexA, indexB;
		for (let i = 0; i < this.population.length; i++) {
			indexA = floor(random(this.matingPool.length));
			indexB = floor(random(this.matingPool.length));
			partnerA = this.matingPool[indexA].dna;
			partnerB = this.matingPool[indexB].dna;

			let child = partnerA.crossover(partnerB);
			child.mutate(this.mutationRate);
			this.population[i] = new Chromosome(child);
		}
		this.generation++;
	}

	// TOOLS

	getMaxFitness() {
    	var record = 0;
    	for (var i = 0; i < this.population.length; i++) {
    	  if (this.population[i].getFitness() > record) {
    	    record = this.population[i].getFitness();
    	  }
    	}
    	return record;
  	}
	
	getGeneration() {
		return this.generation;
	}
	
	getAverage() {
		let total = 0;
		for (let i = 0; i < this.population.length; i++) {
			total += this.population[i].fitness;
		}
		return total / this.population.length;
	}
}