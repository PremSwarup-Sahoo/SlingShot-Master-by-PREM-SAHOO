class Box {

  constructor(x, y, w, h) {
    this.w = w;
    this.h = h;
    let options = {
      // angle: random(TWO_PI),
      friction: 1,
      restitution: 0.8,
      isStatic:true
    }
    this.body = Bodies.rectangle(x+w/2, y+h/2, w, h, options);
    //this.body.angle = PI / 2;
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;
    fill(0);
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    rect(0, 0);
    pop();
  }


}