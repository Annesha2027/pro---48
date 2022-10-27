var shooter, shooter_shooting,shooter_standing;
var zombie;
var backgroundImage;
var bullet;
var score=0;
var gameState = "fight";
var lifeLine1, lifeLine2,lifeLine3;

//loading the images
function preload(){
  shooter_shooting =   loadAnimation("shooter1.png","shooter2.png","shooter3.png","shooter4.png");
  shooter_standing= loadImage("shooter1.png");
  bullet_shooting = loadImage("bullet.png");
  zombie_running = loadImage("zombie.png");
  backgroundImg = loadImage("background.png");
}

//creating canvas,shooter,groups,lifelines
function setup() {
  createCanvas(1300,670);
  shooter = createSprite(400, 200, 50, 50);
  shooter.addImage("shooter1", shooter_standing);
  shooter.scale = 0.3

  lifeLine1 = createSprite(displayWidth-150,40,20,20)
  lifeLine1.visible= false
  lifeLine2 = createSprite(displayWidth-100,40,20,20)
  lifeLine2.visible= false
  lifeLine3 = createSprite(displayWidth-50,40,20,20)
  lifeLine3.visible= false
  
  bulletGroup = new Group()
  zombieGroup = new Group()
}

//writing if conditions
function draw() {
  background(backgroundImg);  

//controling characters using keyboard
  if( keyDown("UP_ARROW")){
   shooter.y = shooter.y - 30;
  }

  if( keyDown("DOWN_ARROW")){
    shooter.y = shooter.y + 30;
   }

  if(keyWentDown("space")){
      bullet = createSprite(shooter.x+30,shooter.y-30,20,10)
      bullet.addImage("bullet", bullet_shooting);
      bullet.scale = 0.1
      bullet.velocityX = 20
      bullet.lifetime= 600;
      bulletGroup.add(bullet);
  
      shooter.depth = bullet.depth
      shooter.depth = shooter.depth+2
      shooter.addAnimation("shooter1", shooter_shooting);
  }

  if(keyWentUp("space")){
    shooter.addImage("shooter1", shooter_standing);
  }


//destroying zombies and shooter after bullets touch them or zombies touching shooter
  if(bulletGroup.isTouching(zombieGroup)){
    for(var i = 0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        score= score+5
      }
    }
  }

  if(zombieGroup.isTouching(shooter)){
    for(var i = 0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(shooter)){
        zombieGroup[i].destroyEach()
        bulletGroup.destroyEach()
        shooter.destroy()
        gameState = "lost"
      }
    }
  }

  //creating scores
  if(score === 100){
    gameState="won";
  }
  textSize(30)
  fill("black");
  text("score="+score, displayWidth-200,displayHeight/2-330);

  //ceating gameStates
  if(gameState === lost){
    textSize(100)
    fill("red")
    text("You Lost",400,400);
    zombieGroup.destroyEach()
    bulletGroup.destroyEach()
    shooter.destroy()
  }
  else if(gameState === won){
    textSize(100)
    fill("red")
    text("You Won",400,400);
    zombieGroup.destroyEach()
    bulletGroup.destroyEach()
    shooter.destroy()

  }

  spawnZombies()
  drawSprites();

}

//spawning the zombies
function spawnZombies(){
  if (frameCount % 80 === 0){
    zombie = createSprite(random(1000,1200),random(100,500),40,20);
    zombie.addImage("zombie", zombie_running);
    zombie.scale = 0.2
    zombie.velocityX = -6
    zombie.lifetime= 400;
    zombieGroup.add(zombie);
  }
}
