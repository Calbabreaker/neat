class Pipe {
    constructor() {
        let pipeSep = birdSize * 2.5;
        this.x = width;
        this.y = random(pipeSep, height - pipeSep);
        this.bottomY = this.y + pipeSep;
        this.topY = this.y - pipeSep;
        this.width = birdSize * 2;
    }

    update() {
        this.x -= birdSize / 6;
    }

    draw() {
        fill(0, 255, 0);
        rect(this.x, this.bottomY, this.width, height);
        rect(this.x, 0, this.width, this.topY);
    }
}
