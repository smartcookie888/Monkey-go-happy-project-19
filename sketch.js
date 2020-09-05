var monkey, monkeyImage
var banana, bananaImage, rock, rockImage
var foodGroup, obstacleGroup
var score = 0;

function preload(){
  monkeyAnim = loadAnimation("monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png");
//  bgImage = loadImage("jungle.png");
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400, 400);
  monkey = createSprite(80,315);
  monkey.addAnimation("monkeymove", monkeyAnim);
  monkey.scale=0.1;
//  bg = createSprite(200,200);
//  bg.addAnimation("bgPic",bgImage);
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(220);
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(keyDown("space") && monkey.y >= 314 - (monkey.scale*(80+monkey.scale*1000))) {
    monkey.velocityY = -14 - (monkey.scale*10);
  }
  //console.log(monkey.y)
  if(obstacleGroup.isTouching(monkey)){
    score -= 5;
    obstacleGroup.destroyEach()
  }
  if(foodGroup.isTouching(monkey)){
    score += 2;
    foodGroup.destroyEach()
  }
  monkey.scale = score/75 + 0.1;
  monkey.velocityY = monkey.velocityY + 0.7;
  spawnFood();
  spawnObstacles();
  monkey.collide(ground); 
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
  drawSprites();
}
function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    rock = createSprite(800,320,10,40);
    rock.velocityX = -6;
    
    //add image to the obstacle 
    rock.addImage(rockImage);
    rock.scale=0.15;
    
    //lifetime to the obstacle     
    rock.lifetime = 300;
    
    //add each obstacle to the group
    obstacleGroup.add(rock);
  }
}