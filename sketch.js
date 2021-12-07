let ground;
let lander;
var lander_img;
var bg_img;
var moonImg;
var moon;


var vx = 0;
var g = 0.02;
var vy = 0;

var meteors = [];
var balls = [];



function preload()
{
  lander_img = loadImage("assets/astronaught.png");
  bg_img = loadImage("assets/space3.gif");
  moonImg = loadImage("assets/moon.png");
}

function setup() {
  createCanvas(1000,500);
  frameRate(80);

  moon = createSprite(950,250,50,50,options={isStatic:true});
  moon.addImage(moonImg);
  moon.scale = 0.7
  moon.setCollider("circle",0,0,250)
  moon.debug = true;
  

  


  lander = createSprite(100,250,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.25;
  

  

  rectMode(CENTER);
  textSize(15);
}

function draw() {
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Horizontal Velocity: "+round(vy),800,75);
  pop();

  //fall down


  if(keyDown("LEFT_ARROW")&& lander.position.x < 710){
    //vy +=g;
    lander.position.x = lander.position.x + -2;
  }

  if(keyDown("RIGHT_ARROW")&& lander.position.x < 710){
    //vy +=g;
    lander.position.x = lander.position.x + 2;
  }


  if(moon.isTouching(lander)){
    text("You Won!",500,250)
  }

  showMeteors();

  for (var i = 0; i < balls.length; i++) {
   showBullets(balls[i], i);
   collisionWithMeteors(i);
 }




  drawSprites();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var bullet = new Bullets(lander.x, lander.y);
    bullets.trajectory = [];
    Matter.Body.setAngle(bullets.body, lander.position.x, lander.position.y);
    balls.push(bullets);
  }
}

function showMeteors(){
  if (meteors.length > 0){
    if(
      meteors[meteors.length-1]=== undefined || 
      meteors[meteors.length-1].body.position.y < 500
    ){
      var positions = [-40,-60,-70,-20];
      var position = random(positions);
      var met = new Meteor(width,height-100,170,170,position);
      meteors.push(meteor);

    }

    for(var i = 0; i < meteors.length; i++){
      if(meteors[i]){
        Matter.Body.setVelocity(meteors[i].body,{
          x: 0,
          y: 0.8
        })
        meteors[i].display();
      }/*else {
        var meteor = new Meteor(500,250,130,100,angle);
        meteors.push(meteor);
        angleMode(DEGREES)
        angle = -60;
      }*/
    }
  }
}

function collisionWithMeteors(index) {
  for (var i = 0; i < meteors.length; i++) {
    if (meteors[index] !== undefined && meteors[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, meteors[i].body);

      if (collision.collided) {
        score+=5
          meteors[i].remove(i);
        

        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}

function showBullets(ball, index) {
  if (ball) {
    ball.display();
    
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      
      ball.remove(index);
      
    }
  }
}



