var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_running;
var bg

var animalsGroup, lion, panther, rhino, scorpion, snake;

var score=0;

var gameOver, restart;



function preload(){
  boy_running =   loadAnimation("boy running1.png","boy running2.png");
  
  bg = loadImage("forest.jpg");
  
  lion = loadImage("lion.png");
  panther= loadImage("panther.png");
  rhino = loadImage("rhino.jpg");
  scorpion = loadImage("scorpion.png");
  snake = loadImage("snake.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  boy = createSprite(50,windowHeight-20,20,50);
  boy.addAnimation("running", boy_running);
  boy.scale = 0.5;
  
  gameOver = createSprite(750,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(750,200);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.35;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,windowHeight-15,400,10);
  invisibleGround.visible = false;

  scorpion.scale = 0.1
  snake.scale = 0.2
  rhino.scale = 0.0000001
  panther.scale = 1
  lion.scale = 0.1
  
  animalsGroup = new Group();
  
  score = 0;
}

function draw() {
  //boy.debug = true;
  background(bg);
  textSize(30)
  fill("black")
  text("Score: "+ score, 20,40);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    bg.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && boy.y >= 159) {
      boy.velocityY = -15;
    }
  
    boy.velocityY = boy.velocityY + 0.8
    boy.collide(invisibleGround);
    spawnanimals();
  
  if(animalsGroup.isTouching(boy)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    boy.velocityY = 0;
    animalsGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    animalsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
}

function spawnanimals() {
  if(frameCount % 120 === 0) {
    var animal = createSprite(windowWidth-100,windowHeight-40,10,40);
    //obstacle.debug = true;
    animal.velocityX = -(8 + 3*score/250);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: animal.addImage(lion);
              break;
      case 2: animal.addImage(panther);
              break;
      case 3: animal.addImage(rhino);
              break;
      case 4: animal.addImage(scorpion);
              break;
      case 5: animal.addImage(snake);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    animal.scale = 0.5;
    animal.lifetime = 300;
    //add each obstacle to the group
    animalsGroup.add(animal);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  animalsGroup.destroyEach();
  
  boy.changeAnimation("running",boy_running);
  score = 0;
  
}