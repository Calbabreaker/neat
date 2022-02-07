class Bird {
    constructor() {
        this.x = birdSize * 2;
        this.y = height / 2;
        this.velocity = 0;
        this.terminalVelocity = birdSize / 3;
        this.brain = new Network();
    }

    update() {
        this.velocity += gravity;
        if (this.velocity > this.terminalVelocity) {
            this.velocity = this.terminalVelocity;
        }

        this.y += this.velocity;
    }

    jump() {
        this.velocity = -birdSize / 3.7;
    }

    outsideBounds() {
        return this.y + birdRadius > height || this.y < birdRadius;
    }

    collidesWith(pipe) {
        if (!pipe) return;
        const atPipe = this.x + birdRadius > pipe.x;
        const yIsInside = this.y + birdRadius > pipe.bottomY || this.y - birdRadius < pipe.topY;
        return atPipe && yIsInside;
    }

    draw() {
        fill(255, 255, 0);
        ellipse(this.x, this.y, birdSize);
    }

    drawBrain(x, y, w, h) {
        fill(255);
        this.brain.nodes.forEach((node) => {
            ellipse();
        });
    }
}
