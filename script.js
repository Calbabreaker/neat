let bird;
let gravity;
let pipes = [];

let birdSize;
let tickCount = 0;
let ticksPerFrame = 1;

const speedLabel = document.getElementById("speedLabel");
const scoreLabel = document.getElementById("scoreLabel");

function setup() {
    createCanvas(innerWidth, innerHeight);
    birdSize = height / 8;
    gravity = birdSize / 128;
    bird = new Bird();
}

function draw() {
    for (let i = 0; i < ticksPerFrame; i++) {
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

        const incomingPipe =
            bird.x - bird.radius / 2 < pipes[0].x + pipes[0].width ? pipes[0] : pipes[1];
        if (bird.outsideBounds() || bird.collidesWith(incomingPipe)) {
            reset();
            break;
        }

        bird.update();
        tickCount += 1;
    }

    background(10);
    pipes.forEach((pipe) => {
        pipe.draw();
    });
    bird.draw();

    speedLabel.textContent = `${ticksPerFrame}x`;
    scoreLabel.textContent = `Score: ${tickCount}`;
}

function reset() {
    pipes = [];
    tickCount = 0;
    bird = new Bird();
    score = 0;
}

function keyPressed() {
    if (key == " ") {
        bird.jump();
    }
}

function mousePressed() {
    bird.jump();
}
