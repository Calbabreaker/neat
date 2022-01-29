class Bird {
    constructor() {
        this.x = birdSize * 2;
        this.y = height / 2;
        this.velocity = 0;
        this.radius = birdSize / 2;
    }

    update() {
        this.velocity += gravity;
        this.y += this.velocity;
    }

    jump() {
        this.velocity = -birdSize / 7;
    }

    outsideBounds() {
        return this.y + this.radius / 2 > height || this.y < this.radius / 2;
    }

    collidesWith(pipe) {
        if (!pipe) return;
        const radiusHalf = this.radius / 2;
        const atPipe = this.x + radiusHalf > pipe.x && this.x - radiusHalf < pipe.x + pipe.width;
        const yIsInside = this.y + radiusHalf > pipe.bottomY || this.y - radiusHalf < pipe.topY;
        return atPipe && yIsInside;
    }

    draw() {
        fill(255, 255, 0);
        ellipse(this.x, this.y, this.radius);
    }
}
