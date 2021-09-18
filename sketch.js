const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const World = Matter.World;
const Constraint = Matter.Constraint;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

let ground;
let world;
let engine;
let rock;
let mConstraint;
let slingshot;
var  bg, canvas, tree, slingshotImg
var gameState = 'shootMode'
var fruitPlaced = 'N', fruit;
var fruitTouched = 'N'
var life = 3
var score = 0
var basket1,basketSide
var heart1,heart2,heart3
var endMessageShown = 'N'
var hasPlayedShootSound = 'N'
var shootSound,popSound, healthReduse

function preload(){
  bg=loadImage('assets/upbg.png')
  tree = loadImage('assets/tree.png')
  slingshotImg = loadImage('assets/slingshot.png')

  heart0 = loadImage('assets/heart0.png')
  heart1 = loadImage('assets/heart1.png')
  heart2 = loadImage('assets/heart2.png')
  heart3 = loadImage('assets/heart3.png')

  shootSound = loadSound('assets/bow_shoot.mp3')
  popSound = loadSound('assets/pop.mp3')
  healthReduse = loadSound('assets/minus.mp3')
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  basketSide = 'right'
  ground = new Boundary(-7000, height-20, width+14000, 20);
  rock = new Rock(width-350, 400, 20);

  let canvasmouse = Mouse.create(canvas.elt);
  canvasmouse.pixelRatio = pixelDensity();
  let options = {
    mouse: canvasmouse,
  }
    mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);

  slingshot = Constraint.create({
    pointA: {
      x: width-350,
      y: 380
    },
    bodyB: rock.body,
    length: 20,
    stiffness: 0.03
  });
  World.add(world, slingshot);

  basket1 = new Basket(229,height-70,170, 99)
  greeting = createElement("h2");
  greeting.position(width-600,0);
  greeting.class("greeting");

  infoButton = createButton("");
  infoButton.class("infoButton");
  infoButton.position(width-680, 25);

  restartButton = createButton("");
  restartButton.class("restartButton");
  restartButton.position(width-750, 25);
}


function draw() {
  background('cyan');
  image(tree,28, -22, 700, 702)
  image(slingshotImg,width-400, height-275)
  image(bg,0,0,width,height)
  Engine.update(engine);

console.log(gameState)


if (life==3){
  image(heart3,width-260,-70)
}

else if (life==2){
  image(heart2,width-260,-70)
}

else if (life==1){
  image(heart1,width-260,-70)
}

else if (life==0){
  image(heart0,width-260,-70)
  if (endMessageShown='N'){
  swal({
    title: `Game Over`,
    text: `Your collected ${score} fruits`,
    imageUrl:
      "assets/gameover.jpg",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
  endMessageShown='Y'
  slingshot='remved to make a error and quit the game'
  }
}

  ground.show();
  rock.show();
  basket1.show()
  // console.log(gameState)

  let posR = rock.body.position;
  let posS = slingshot.pointA

   if (basket1.body.position.x<=230){
    basketSide = 'right'
  }
  
  if (basket1.body.position.x>=735){
    basketSide = 'left'
  }

  if (basketSide=='right'){
    Matter.Body.setVelocity(basket1.body,{x:5,y:0})
  }
  
  if (basketSide=='left'){
    Matter.Body.setVelocity(basket1.body,{x:-5,y:0})
  }

// ShootMode ---------------------------------------------------------
if (gameState=='shootMode'){

  if (!mouseIsPressed) {
    let d = dist(posR.x, posR.y, posS.x, posS.y);
    if (d > 60 && posR.x > 150) {
      slingshot.bodyB = null;
      if (hasPlayedShootSound=='N'){
        shootSound.play()
      }
      gameState='waitMode'
      
    }
  }

  if (slingshot.bodyB) {
    push()
    stroke(0);
    strokeWeight(10);
    line(slingshot.pointA.x+10, slingshot.pointA.y, rock.body.position.x, rock.body.position.y);
    line(slingshot.pointA.x-30, slingshot.pointA.y, rock.body.position.x, rock.body.position.y);
    
    pop()
  }

  if (fruitPlaced=='N'){
    fruitX = getRandomFruitPosX()
    fruitY = getRandomFruitPosY() 
    r = 30
    fruit = new Fruit(fruitX,fruitY,r)

    fruitPlaced = "Y"
  }
}
  if (fruitPlaced=='Y'){
    fruit.show()
  }

  if (gameState=='waitMode'){
    rockFruitCollision = Matter.SAT.collides(fruit.body,rock.body)
    if (rockFruitCollision.collided){
      Matter.Body.setStatic(fruit.body, false)
      fruitTouched = 'Y'
    }
    hasTouchedGround = Matter.SAT.collides(ground.body,rock.body)
    if (hasTouchedGround.collided){
      rock.remove()
      rock = new Rock(width-350, 400, 20);
      slingshot.bodyB = rock.body; 
      hasPlayedShootSound = 'N'
      gameState='shootMode'
  }
  }

  fruitTouchedBasket = Matter.SAT.collides(fruit.body,basket1.body)
  if (fruitTouchedBasket.collided){
    score+=1
    popSound.play()
    fruit.remove()
    fruitPlaced = 'N'
    gameState='shootMode'
  }

  fruitTouchedGround = Matter.SAT.collides(fruit.body,ground.body)
  if (fruitTouchedGround.collided){
    life-=1
    healthReduse.play()
    fruit.remove()
    fruitPlaced = 'N'
    gameState='shootMode'
  }
  var message = `Fruit Collected =  ${score}`;
greeting.html(message);

infoButton.mousePressed(() => {
  howToPlay()
});

restartButton.mousePressed(() => {
  window.location.reload()
});
}


function getRandomFruitPosX(){
  // y = 20,300
  // x= 230,530
  randX = Math.round(random(230,530))
return randX
}

function getRandomFruitPosY(){
  randY = Math.round(random(20,300))
  return randY
}


function howToPlay() {
  swal({
    title: `Creator-Prem Swarup Sahoo
    -------------------------------------
    How To Play`,
    text: `-> There is no limit of stones.................................
    -> Your Score will increase, if the fruit fall into the basket.
    -> Your Life will be redused, if your fruit fall on the ground.`,
    imageUrl:
      "assets/creator-PremSahoo.jpg",
    imageSize: "100x100",
    confirmButtonText: "Ok"
  });
}