let ball,Goldball,secondball,player,nowballCount=0,ScoreCount=0,goldball_Timer=0,Goal_text,mpx,mpy,playerx=0,playery=0,imgy=-50;
let mathx,mathy;
let visibleGoal_1=1,visibleGoal_2=1,goal_1_x,goal_2_x,goal_1_y,goal_2_y
let audio;//音声設定用変数
//画像の設定
const panelImage = "./images/screen.png";
const playerImage = "./images/testpet.gif";
const ballImage = "./images/ball.png";
const GoldballImage = "./images/Goldball.png";
const Smash_BallGuideImage = "./images/SBGuide.png"
let img_1 = null;
let img_2 = null;
let img_3 = null;
let img_4 = null;
let img_5 = null;
function preload(){
  img_1 = loadImage(panelImage);
  img_2 = loadImage(playerImage);    //画像の読み込み
  img_3 = loadImage(ballImage);
  img_4 = loadImage(GoldballImage);
  img_5 = loadImage(Smash_BallGuideImage);
}
/*ゲーム画面の遷移
  96020でゲーム本体、96021でゲームの説明、96022でリザルト*/
let gameScreenSelect=96021;//ゲーム画面遷移用変数

let landx,landy,BreakCount=0;
let GameTimer=60*60;//ミニゲームの時間=実際の時間xフレームレート60
let GameStartTimer = 3*60;//カウントダウン=実際の時間xフレームレート60
let ShortPower=1;
let speed=5;

function setup() {
	
	frameRate(60);//秒間60回処理
	background(255);//背景生成
	textSize(10);//文字の大きさ
	noStroke();

	//ボールの初期位置設定
	landx=windowWidth/2;
	landy=windowHeight/2;
	/*ボールの設定*/ 
	ball = createSprite(landx,landy);	
	ball.color="white"
	ball.image = img_3;
	ball.mass = 1;
	ball.restitution = 1.1;

	Goldball = createSprite(landx,-500);	
	Goldball.color="white"
	Goldball.image = img_4;
	Goldball.mass = 1;
	Goldball.restitution = 1.1;
	Goldball.visible = false
	/*壁の設定*/
	noStroke()
	north_wall = createSprite(windowWidth/2-50,100);
	north_wall.width=windowWidth-300
	north_wall.height=5
	north_wall.color = "white"
	north_wall.collider = 'static';

	south_wall = createSprite(windowWidth/2-50,windowHeight-200);
	south_wall.width=windowWidth-300
	south_wall.height=5
	south_wall.color = "white"
	south_wall.collider = 'static';

	west_wall = createSprite(100,windowHeight/2-50);
	west_wall.width=5
	west_wall.height=windowHeight-300
	west_wall.color = "white"
	west_wall.collider = 'static';

	east_wall = createSprite(windowWidth-200,windowHeight/2-50);
	east_wall.width=5
	east_wall.height=windowHeight-300
	east_wall.color = "white"
	east_wall.collider = 'static';
	/*ゴールの設定*/
	goal_1 = new Group();
	goal_1.x = 1000
	goal_1.y = windowHeight/2

	goal_area_1 =new goal_1.Sprite(goal_1.x,goal_1.y);
	goal_area_1.width = 40
	goal_area_1.height = 145
	goal_area_1.collider = "static"
	goal_area_1.color = "gray"

	goal_wall_1_1 =new goal_1.Sprite(goal_area_1.x,goal_area_1.y-goal_area_1.height/2);
	goal_wall_1_1.width = 45
	goal_wall_1_1.height = 5
	goal_wall_1_1.collider = "static"
	goal_wall_1_1.color = "White"

	goal_wall_1_2 = new goal_1.Sprite(goal_area_1.x,goal_area_1.y+goal_area_1.height/2);
	goal_wall_1_2.width = 45
	goal_wall_1_2.height = 5
	goal_wall_1_2.collider = "static"
	goal_wall_1_2.color = "White"

	goal_wall_1_3 = new goal_1.Sprite(goal_1.x+goal_area_1.width,goal_area_1.y);
	goal_wall_1_3.width = 5
	goal_wall_1_3.height = 150
	goal_wall_1_3.collider = "static"
	goal_wall_1_3.color = "White"

	goal_2 = new Group();
	goal_2.x = 300
	goal_2.y = windowHeight/2

	goal_area_2 =new goal_2.Sprite(goal_2.x,goal_2.y);
	goal_area_2.width = 40
	goal_area_2.height = 145
	goal_area_2.collider = "static"
	goal_area_2.color = "gray"

	goal_wall_2_1 =new goal_2.Sprite(goal_area_2.x,goal_area_2.y-goal_area_2.height/2);
	goal_wall_2_1.width = 45
	goal_wall_2_1.height = 5
	goal_wall_2_1.collider = "static"
	goal_wall_2_1.color = "White"

	goal_wall_2_2 = new goal_2.Sprite(goal_area_2.x,goal_area_2.y+goal_area_2.height/2);
	goal_wall_2_2.width = 45
	goal_wall_2_2.height = 5
	goal_wall_2_2.collider = "static"
	goal_wall_2_2.color = "White"

	goal_wall_2_3 = new goal_2.Sprite(goal_2.x-goal_area_2.width/2,goal_area_2.y);
	goal_wall_2_3.width = 5
	goal_wall_2_3.height = 150
	goal_wall_2_3.collider = "static"
	goal_wall_2_3.color = "White"

	goal_3 = new Group();
	goal_3.x = windowWidth/2
	goal_3.y = 200

	goal_area_3 =new goal_3.Sprite(goal_3.x,goal_3.y);
	goal_area_3.width = 145
	goal_area_3.height = 40
	goal_area_3.collider = "static"
	goal_area_3.color = "gray"

	goal_wall_3_1 =new goal_3.Sprite(goal_area_3.x,goal_area_3.y);
	goal_wall_3_1.width = 5
	goal_wall_3_1.height = 45
	goal_wall_3_1.collider = "static"
	goal_wall_3_1.color = "White"

	goal_wall_3_2 = new goal_3.Sprite(goal_area_3.x,goal_area_3.y);
	goal_wall_3_2.width = 5
	goal_wall_3_2.height = 45
	goal_wall_3_2.collider = "static"
	goal_wall_3_2.color = "White"

	goal_wall_3_3 = new goal_3.Sprite(goal_3.x,goal_area_3.y);
	goal_wall_3_3.width = 150
	goal_wall_3_3.height = 5
	goal_wall_3_3.collider = "static"
	goal_wall_3_3.color = "White"

	goal_4 = new Group();
	goal_4.x = windowWidth/2
	goal_4.y = 500

	goal_area_4 =new goal_4.Sprite(goal_4.x,goal_4.y);
	goal_area_4.width = 145
	goal_area_4.height = 40
	goal_area_4.collider = "static"
	goal_area_4.color = "gray"

	goal_wall_4_1 =new goal_4.Sprite(goal_area_4.x,goal_area_4.y);
	goal_wall_4_1.width = 5
	goal_wall_4_1.height = 45
	goal_wall_4_1.collider = "static"
	goal_wall_4_1.color = "White"

	goal_wall_4_2 = new goal_4.Sprite(goal_area_4.x,goal_area_4.y);
	goal_wall_4_2.width = 5
	goal_wall_4_2.height = 45
	goal_wall_4_2.collider = "static"
	goal_wall_4_2.color = "White"

	goal_wall_4_3 = new goal_4.Sprite(goal_4.x,goal_area_4.y);
	goal_wall_4_3.width = 150
	goal_wall_4_3.height = 5
	goal_wall_4_3.collider = "static"
	goal_wall_4_3.color = "White"

	goal_2.visible=false
	goal_3.visible=false
	goal_4.visible=false

	if(nowballCount>=5){
		visibleGoal_2 = parseInt(random(1,5))
		}
		else{
			visibleGoal_2 = 0
		}
	/*ペットの設定*/
	player = createSprite(windowWidth/4,windowHeight/2);	
	player.color="Blue"
	player.image = img_2;
	player.width = 50;
	player.height = 50;
	player.mass = 1;
	player.rotationLock = true;

	GameTimer = 60 * 60;
}

function draw(){
	createCanvas(windowWidth-100, windowHeight-100);//ウィンドウサイズ-100の大きさのキャンバス作成
	if(gameScreenSelect == 96021){
		image(img_5,0,0,windowWidth-100,windowHeight-100)
		north_wall.visible = false
		west_wall.visible = false
		east_wall.visible = false
		south_wall.visible = false
		player.visible = false
		ball.visible = false
		Goldball.visible = false
		goal_1.visible = false
	}
	else if(gameScreenSelect==96020){
	background(100,255,100);
	fill(90);
	if(GameTimer > 0){
GameTimer -= 1;
	}
	else{
		gameScreenSelect = 96022
	}
	if(goldball_Timer > 0){
		goldball_Timer-=1;
		Goldball.visible = true
		if(goldball_Timer % 60 == 0 && goldball_Timer <= 5 * 60){
			Goldball.visible = false
		}
		if(goldball_Timer % 30 == 0 &&goldball_Timer <= 3 * 60){
			Goldball.visible = false
		}
		if(goldball_Timer % 10 == 0 &&goldball_Timer <= 1 * 60){
			Goldball.visible = false
		}
	}
	else{
		Goldball.y = -500
	}

	goal_wall_1_1.y = goal_area_1.y - goal_area_1.height/2
	goal_wall_1_2.y = goal_area_1.y + goal_area_1.height/2
	goal_wall_1_3.x = goal_area_1.x + goal_area_1.width/2
	goal_wall_2_1.y = goal_area_2.y - goal_area_2.height/2
	goal_wall_2_2.y = goal_area_2.y + goal_area_2.height/2
	goal_wall_2_3.x = goal_area_2.x - goal_area_2.width/2
	goal_wall_3_1.x = goal_area_3.x - goal_area_3.width/2
	goal_wall_3_2.x = goal_area_3.x + goal_area_3.width/2
	goal_wall_3_3.y = goal_area_3.y - goal_area_3.height/2
	goal_wall_4_1.x = goal_area_4.x - goal_area_4.width/2
	goal_wall_4_2.x = goal_area_4.x + goal_area_4.width/2
	goal_wall_4_3.y = goal_area_4.y + goal_area_4.height/2

	if (ball.collides(goal_area_1)||ball.collides(goal_area_2)||ball.collides(goal_area_3)||ball.collides(goal_area_4)||Goldball.collides(goal_area_1)||Goldball.collides(goal_area_2)||Goldball.collides(goal_area_3)||Goldball.collides(goal_area_4)) {
		if(ball.collides(goal_area_1)||ball.collides(goal_area_2)||ball.collides(goal_area_3)||ball.collides(goal_area_4)){
		ball.x = windowWidth/2
		ball.y = windowHeight/2
		ScoreCount+=1;
		}
		if(Goldball.collides(goal_area_1)||Goldball.collides(goal_area_2)||Goldball.collides(goal_area_3)||Goldball.collides(goal_area_4)){
			Goldball.y = -500
			ScoreCount+=3;
			Goldball.visible = false
			goldball_Timer = 0
		}
		nowballCount+=1;
		visibleGoal_1 = parseInt(random(1,5))
		if(nowballCount>=5){
			do{
				visibleGoal_2 = parseInt(random(1,5))
			}while(visibleGoal_1 == visibleGoal_2)
		}
		else{
			visibleGoal_2 = 0
		}
		if(nowballCount % 5 == 0&&goldball_Timer<=0){
			goldball_Timer =10 * 60;
			Goldball.visible = true
			Goldball.x = windowWidth/2
			Goldball.y = windowHeight/2
		}
		goal_1.visible=false
		goal_1.x = -500
		goal_2.visible=false
		goal_2.x = -500
		goal_3.visible=false
		goal_3.x = -500
		goal_4.visible=false
		goal_4.x = -500
		if(visibleGoal_1==1||visibleGoal_2==1){
			goal_1.visible = true
			goal_1.x = random(windowWidth/2+100,east_wall.x-100)
			goal_1.y = random(north_wall.y+100,south_wall.y-100)
		}
		if(visibleGoal_1==2||visibleGoal_2==2){
			goal_2.visible = true
			goal_2.x = random(west_wall.x+100,windowWidth/2-100)
			goal_2.y = random(150,windowHeight-400)
		}
		if(visibleGoal_1==3||visibleGoal_2==3){
			goal_3.visible = true
			goal_3.x = random(west_wall.x+200,east_wall.x-200)
			goal_3.y = random(north_wall.y+100,windowHeight/2-100)
		}
		if(visibleGoal_1==4||visibleGoal_2==4){
			goal_4.visible = true
			goal_4.x = random(west_wall.x+200,east_wall.x-200)
			goal_4.y = random(windowHeight/2+100,south_wall.y-100)
		}
	}

	player.vel.x=playerx;
	player.vel.y=playery;
	
//デバッグ用テキスト
fill(0)
/*textSize(12);
text("goal_1:"+goal_1.x+","+goal_1.y,100,250);
text("goal_2:"+goal_2.x+","+goal_2.y,100,300);
text("goal_3:"+goal_3.x+","+goal_3.y,100,350);
text("goal_4:"+goal_4.x+","+goal_4.y,100,400);
text("Gball:"+Goldball.x+","+Goldball.y,100,450);
text("GballTimer:"+parseInt(goldball_Timer/60),100,500);*/
textSize(24);
text("スコア:"+ScoreCount,windowWidth/2-300,windowHeight-150);
text("ゴール数:"+nowballCount,windowWidth/2+100,windowHeight-150);
textSize(48);
fill(255)
text(parseInt(GameTimer/60),windowWidth/2-100,50);
	}
	else if(gameScreenSelect == 96022){
		north_wall.visible = false
		west_wall.visible = false
		east_wall.visible = false
		south_wall.visible = false
		player.visible = false
		ball.visible = false
		Goldball.visible = false
		goal_1.visible = false
		goal_2.visible = false
		goal_3.visible = false
		goal_4.visible = false//スプライトの非表示
		image(img_1,50,imgy,windowWidth-200,windowHeight-300);
		if(imgy<100){
			imgy+=5;
		}
		else{
			textSize(36);
		fill(0);
		text("結果発表！",windowWidth/2-150,200);
		text("スコア    " + ScoreCount,windowWidth/2-500,250);
		if(ScoreCount>=20){text("クリアランク    S",windowWidth/2-500,300);text("手に入れた餌   ？？＋5",windowWidth/2-500,400);}
		else if(ScoreCount>=15){text("クリアランク    A",windowWidth/2-500,300);text("手に入れた餌   ？？＋4",windowWidth/2-500,400);}
		else if(ScoreCount>=10){text("クリアランク    B",windowWidth/2-500,300);text("手に入れた餌   ？？＋3",windowWidth/2-500,400);}
		else{text("クリアランク    C",windowWidth/2-500,300);text("手に入れた餌   ？？＋１",windowWidth/2-500,400);}
		text("やめる",windowWidth/2-450,475);text("もう一度！",windowWidth/2,475);
		}
	}
}
function mousePressed() {//マウスのボタンを押したとき処理される
	if(gameScreenSelect == 96021){
		north_wall.visible = true
		west_wall.visible = true
		east_wall.visible = true
		south_wall.visible = true
		player.visible = true
		ball.visible = true
		goal_1.visible = true	
		gameScreenSelect = 96020;
		console.log(gameScreenSelect)
	}
	else if(gameScreenSelect==96022){
		//もう一度！が押された時の初期化設定
		if(mpx>=windowWidth/2&&mpx<=windowWidth/2+300&&mpy>=400&&mpy<=500){
		gameScreenSelect=96020;
		GameTimer=60*60;
		ScoreCount=0
		nowballCount = 0
		imgy=-50;
		north_wall.visible = true
		west_wall.visible = true
		east_wall.visible = true
		south_wall.visible = true
		player.visible = true
		ball.visible = true
		goal_1.visible = true	
		goal_1.x = 1000
	goal_1.y = windowHeight/2
	ball.x = windowWidth/2
	ball.y = windowHeight/2
	player.x = windowWidth/4
	player.y = windowHeight/2
	}
}

}
function mouseDragged() {//マウスのボタンを押している間処理される
	//クリックした瞬間のマウスの位置をmpx,mpyに代入
	mpx = mouseX;
	mpy = mouseY;
	if(mpx>=player.x){
		mathx=mpx-player.x;
		playerx=speed;
	}
	else{
		mathx=player.x-mpx;
		playerx= -speed;
	}
	if(mpy>=player.y){
		mathy=mpy-player.y;
		playery=speed;
	}
	else{
		mathy=player.y-mpy;
		playery=-speed;
	}
	if(mathx>=mathy){
			
		playery*=(mathy/mathx);
	}
	else{
		playerx*=(mathx/mathy);
	}
}
function mouseReleased() {//マウスのボタンを離した時処理される
	playerx=0;
	playery=0;
}