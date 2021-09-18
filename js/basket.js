class Basket {

    constructor(x, y, w, h) {
      this.w = w;
      this.h = h;
      var options = {isStatic:true}
      this.body = Bodies.rectangle(x, y, w, h);
      this.image = loadImage('assets/basket.png')
      World.add(world, this.body);
    }
  
    show() {
      let pos = this.body.position;
      let angle = this.body.angle;
      fill(0);
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image,0, 0, this.w, this.h);
      pop();
    }
  
  
  }