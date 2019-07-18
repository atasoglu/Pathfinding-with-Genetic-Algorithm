/*
https://github.com/atasoglu98/Pathfinding-with-Genetic-Algorithm
Path Finding w/ Genetic Algorithm
*/

const DIAMETER = 30;

const LIFETIME = 160;

let hitScore = 0;
let highScore = 0;

let lifeCounter = LIFETIME;
let population;
let popSize = 50;
let mutationRate = 0.01;

let target;

let generationP, lifeP, hitP;

function setup() {
	createCanvas(500, 500);
	population = new Population(popSize, mutationRate);
	target = createVector(width - DIAMETER / 2, height - DIAMETER / 2);
	timerP = createP("<b>Remaining: "+ lifeCounter +"</b>");
	timerP.position(10, height + 75);
	generationP = createP("<b>Generation: 1</b>");
	generationP.position(10, height + 95);
	hitP = createP("<b>Target hit 0/" + popSize + "</b>");
	hitP.position(10, height + 115);
	highScoreP = createP("<b>Highscore: " + highScore + " hit</b>")
	highScoreP.position(10, height + 135);
	// noStroke();
}
function draw() {
	background(220);

	fill(0, 0, 255);
	ellipse(target.x, target.y, DIAMETER, DIAMETER);

	if (lifeCounter > 0) {
		population.run();
		lifeCounter--;
		timerP.html("<b>Remaining time: "+ lifeCounter +"</b>");
	}
	else {
		lifeCounter = LIFETIME;
		if (hitScore > highScore) highScore = hitScore;
		highScoreP.html("<b>Highscore: " + highScore + " hit</b>");
		hitScore = 0;
		population.calcFitness();
		population.naturalSelection();
		population.generate();
		fill(0);
		generationP.html("<b>Generation: " + population.getGeneration() + "</b>");
	}
	hitP.html("<b>Target hit: " + hitScore + "/" + popSize + "</b>");
}	

function mousePressed() {
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
		target.x = mouseX;
		target.y = mouseY;
	}
}
