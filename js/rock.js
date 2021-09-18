class Rock {

  constructor(x, y, r) {
    this.r = r;
    let options = {
      // angle: random(TWO_PI),
      // friction: 0,
      restitution: 0.4
    }
    this.body = Bodies.circle(x, y, r, options);
    this.trajectory = [];
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;
    fill(159,159,159);
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    ellipse(0, 0, this.r*2);
    pop();

    if (gameState=='waitMode') {
      var position = [this.body.position.x, this.body.position.y];
      this.trajectory.push(position);
    }

    for (var i = 0; i < this.trajectory.length; i++) {
      ellipse(this.trajectory[i][0], this.trajectory[i][1], 5, 5);

    }
  }

  remove() {
    Matter.Body.setVelocity(this.body,{x:0,y:0})
    setTimeout(() => {
      Matter.World.remove(world, this.body);
    }, 1000);
  }

}