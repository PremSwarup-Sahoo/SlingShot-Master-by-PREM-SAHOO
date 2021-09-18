class Fruit {

    constructor(x, y, r) {
      this.r = r;
      let options = {
        // angle: random(TWO_PI),
        //   friction: 0,
        isStatic:true,

      }
      this.body = Bodies.circle(x, y, r, options);
      this.image = loadImage('assets/mango.png')
      // this.body.angle = PI / 2;
      World.add(world, this.body);
    }
  
    show() {
      let pos = this.body.position;
      let angle = this.body.angle;
      fill(0,159,159);
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      image(this.image, 0, 0, 40,59);
      pop();
    }
  
    remove() {
      Matter.Body.setVelocity(this.body,{x:0,y:0})
      setTimeout(() => {
        Matter.World.remove(world, this.body);
      }, 1000);
    }
  
  }