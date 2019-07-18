class DNA {
  constructor(genes) {

    this.maxForce = 0.5;

    this.genes = [];
    if (arguments.length < 1) {
      for (let i = 0; i < LIFETIME; i++) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].mult(random(this.maxForce));
      }
    } else {
      this.genes = genes;
    }
  }

  crossover(partner) {
    let childgenes = [];
    let midpoint = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) childgenes[i] = this.genes[i];
      else childgenes[i] = partner.genes[i];
    }
    let newchild = new DNA(childgenes);
    return newchild; 
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].mult(random(this.maxForce));
      }
    }
  }
}
