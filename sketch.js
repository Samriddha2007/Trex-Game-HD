var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var PLAY = 1,END = 0,gameState = PLAY;

var restart,gameover;

function preload(){
  trex_collided = loadAnimation("crash1.png","crash2.png","crash3.png","crash4.png","crash5.png","crash6.png","crash7.png","crash8.png","crash9.png","crash10.png");
 
 
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png","trex4.png","trex5.png","trex6.png","trex7.png","trex8.png","trex9.png","trex10.png","trex11.png","trex12.png","trex13.png","trex14.png","trex15.png","trex16.png","trex17.png","trex18.png","trex19.png");
  
  trex_still = loadImage("trex1.png");
 
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImage = loadImage("restart.png");
  gameoverImage = loadImage("gameOver.png");
}

function setup() {
  canvas = createCanvas(displayWidth , displayHeight);

  



  trex = createSprite(displayWidth- 1236,displayHeight - 250,20,50 );
  trex.addAnimation("running", trex_running);
  trex.scale = 0.35;

  trex_clown = createSprite(trex.x,trex.y + 20,20,50 );
  trex_clown.addImage("still",trex_still);
  trex_clown.scale = 0.35;

    
  trex_clone = createSprite(trex_clown.x + 80,trex_clown.y - 40,20,50);
  trex_clone.addAnimation("collided",trex_collided);
  trex_clone.scale = 0.5;
  
  ground = createSprite(displayWidth - 466,displayHeight - 190,displayWidth+1000,displayHeight - 748);
  ground.addImage("ground",groundImage);
  ground.velocityX = -6;
  
  invisibleGround = createSprite(displayWidth - 971,displayHeight - 190,displayWidth,displayHeight-758);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  restart = createSprite(displayWidth-750,displayHeight-500,10,10);
  restart.addImage("restart",restartImage);
  restart.scale = 0.8;
  
  gameover = createSprite(displayWidth-750,displayHeight-600,10,10);
  gameover.addImage("Over",gameoverImage);
  gameover.scale = 1.5;
}

function draw() 
{
  console.log(ground.x);
  trex.setCollider("circle", 70, 0, 100);
  
  background(180);
  camera.position.x = displayWidth - 750;
  camera.position.y = displayHeight - 500;
  if(gameState == PLAY)
  {
  score = score + Math.round(getFrameRate()/60);
  textStyle(BOLDITALIC);
  textSize(50);
  text("Score: "+ score, 500,50);
  
  if(keyDown("space") && trex.y >= displayHeight - 250 ) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.35;
  
  if (ground.x < displayWidth - 566){
    ground.x = displayWidth - 466;
  }
  
  restart.visible = false;
  gameover.visible = false;
  trex_clone.visible = false;
  trex.visible = true;
  trex_clown.visible = false;

  if(obstaclesGroup.isTouching(trex))
  {
    gameState = END; 
  }
  }
  else if(gameState == END)
  {
    gameover.visible = true;
    restart.visible = true;
    trex_clone.visible = true;
    trex.visible = false;
    trex_clown.visible = true;
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    trex_clone.changeAnimation("collided",trex_collided);
    trex_clone.changeAnimation("still",trex_still);
    
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart))
    {
       reset();
    }
  }
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
  drawSprites();
}
function reset()
{
  gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
  ground.velocityX = -5;
}
function spawnClouds() 
{
  //write code here to spawn the clouds
  if (frameCount % 90 === 0) {
    var cloud = createSprite(displayWidth + 220,displayHeight -715,40,10);
    cloud.y = Math.round(random(displayHeight - 615,displayHeight - 715));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3 ;
  
     //assign lifetime to the variable
    cloud.lifetime = 650;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  
  if(frameCount % 90 === 0) {
    var obstacle = createSprite(displayWidth + 200,displayHeight - 240,10,40);
    obstacle.velocityX = -9;
   // obstacle.debug = true;
    obstacle.setCollider("rectangle", 0, 50, 150, 200, 0);
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.35;
    obstacle.lifetime = 380;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
