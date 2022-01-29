let bird;
let gravity;
let pipes = [];

let birdSize;
let tickCount = 0;
let ticksPerFrame = 1;

const speedLabel = document.getElementById("speedLabel");

function setup() {
    createCanvas(innerWidth, innerHeight);
    birdSize = height / 8;
    gravity = birdSize / 128;
    bird = new Bird();
}

function draw() {
    for (let i = 0; i < ticksPerFrame; i++) {
        bird.update();
        if (bird.outsideBounds() || bird.collidesWith(pipes[0])) {
            return reset();
        }

        for (let i = pipes.length - 1; i >= 0; i--) {
            const pipe = pipes[i];
            pipe.update();
            if (pipe.x < -pipe.width) {
                pipes.splice(i, 1);
            }
        }

        if (tickCount % 80 == 0) {
            pipes.push(new Pipe());
        }

        tickCount += 1;
    }

    background(10);
    pipes.forEach((pipe) => {
        pipe.draw();
    });
    bird.draw();

    speedLabel.textContent = `${ticksPerFrame}x`;
}

function reset() {
    pipes = [];
    tickCount = 0;
    bird = new Bird();
}

function keyPressed() {
    if (key == " ") {
        bird.jump();
    }
}

function mousePressed() {
    bird.jump();
}
