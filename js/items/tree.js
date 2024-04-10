class Tree {
    constructor(center, size, heightCoef = 0.3) {
        this.center = center;
        this.size = size;
        this.heightCoef = heightCoef;
        this.base = this.#generateLevel(center, size);
    }

    #generateLevel(point, size) {
        const points = [];
        const rad = size / 2;

        for (let i = 0; i < Math.PI * 2; i += Math.PI / 16) {
            const kindOfRandom = Math.cos(((i + this.center.x) * size) % 17) ** 2;
            const noisyRadius = rad * lerp(0.5, 1, kindOfRandom);
            points.push(translate(point, i, noisyRadius));
        }
        return new Polygon(points);
    }

    draw(ctx, viewPoint) {
        const diff = subtract(this.center, viewPoint);

        const top = add(this.center, scale(diff, this.heightCoef));

        const levelCount = 7;
        for (let i = 0; i < levelCount; i++) {
            const t = i / (levelCount - 1);
            const point = lerp2D(this.center, top, t);
            const color = "rgb(30," + lerp(50, 200, t) + ",70";
            const size = lerp(this.size, 40, t);
            //point.draw(ctx, {size: size, color: color})
            const poly = this.#generateLevel(point, size);
            poly.draw(ctx, {fill: color, stroke: 'rgba(0,0,0,0)'})
        }
      //  this.base.draw(ctx);
    }
}