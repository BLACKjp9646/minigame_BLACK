let petImage;
let backgroundImage;
let PetmoveTimer=2*60,PetTargetPos_x,PetTargetPos_y,PetmovingTimer=0;

let gameScreenSelect=0;//ミニゲーム遷移用変数

/*メニューバー用変数 */
let menuSelect = 0,menuUI_x=0,menuUI_y=0;
let menuIcon_poslist = [[200,155],[300,155],[400,155]];
let menuIcon_poslist_2 = [[200,255],[250,255],[350,255],[450,255]];
const menuImage_1 = "./assets/menuIcon_1.png";
const menuImage_2 = "./assets/menuIcon_2.png";
const menuImage_3 = "./assets/menuIcon_3.png";
const menuImage_4 = "./assets/menuIcon_4.png";
const gameImage_1 = "./assets/gameIcon_1.png";
const gameImage_2 = "./assets/gameIcon_2.png";
const gameImage_3 = "./assets/gameIcon_3.png";
let menuimg_list=[null,null,null,null];
let gameimg_list=[null,null,null];

/*メニューバー用変数ここまで */
/*ミニゲーム用変数*/

let kawara,weakkawara,pet,nextkawara,nowkawaraCount=10,Breakkawara_text,mpx,mpy,imgy=-50;
int = x1=0,x2=0,x3=0,x4=0,x5=0,x6=0,y1=0,y2=0,y3=0,y4=0,y5=0,y6=0;
let ball,Goldball,secondball,player,nowballCount=0,ScoreCount=0,goldball_Timer=0,Goal_text,playerx=0,playery=0;
let mathx,mathy;
let visibleGoal_1=1,visibleGoal_2=1,goal_1_x,goal_2_x,goal_1_y,goal_2_y
let audio;//音声設定用変数
/*ゲーム画面の遷移
  96010で瓦ゲーム本体、96011で瓦ゲームの説明、96012で瓦リザルト*/

  let ClickHelp=1;
  let landx,landy,BreakCount=0,kawaraHP=10,kawarapreHP=10;
  let GameTimer=60*60;//ミニゲームの時間=実際の時間xフレームレート60
  let BreakPower=1;
  let BreakStamina=10;
  let ShortPower=1;
let speed=5;
  //画像の設定
const panelImage = "./assets/screen.png";
const hibiwareImage = "./assets/hibiware.png";
const ballImage = "./assets/ball.png";
const GoldballImage = "./assets/Goldball.png";
const Smash_BallGuideImage = "./assets/SBGuide.png"
let img_1 = null;
let img_2 = null;
let img_3 = null;
let img_4 = null;
let img_5 = null;
/*ここまで*/
function preload() {
  // 画像のパスを指定してプリロード
  petImage = loadImage('./assets/to-masu.png');
  backgroundImage = loadImage('./assets/y_bkg.png');
  //画像の読み込み
  img_1 = loadImage(panelImage);
  img_2 = loadImage(hibiwareImage);
  img_3 = loadImage(ballImage);
  img_4 = loadImage(GoldballImage);
  img_5 = loadImage(Smash_BallGuideImage);
  menuimg_list[0] = loadImage(menuImage_1);
  menuimg_list[1] = loadImage(menuImage_2);
  menuimg_list[2] = loadImage(menuImage_3);
  menuimg_list[3] = loadImage(menuImage_4);

  gameimg_list[0] = loadImage(gameImage_1);
  gameimg_list[1] = loadImage(gameImage_2);
  gameimg_list[2] = loadImage(gameImage_3);
}

class Pet {
	constructor() {
		this.x = width / 2; // 初期位置：画面の中央
		this.y = height / 2;
		this.size = 100;
		this.speed = 5;

	}
	autoMove() {
		// ペットの座標を更新
		if(PetmoveTimer<=0){
		if(this.x>=PetTargetPos_x-10&&this.x<=PetTargetPos_x+10&&this.y>=PetTargetPos_y-10&&this.y<=PetTargetPos_y+10){
			PetmoveTimer=2*60;
		}
		else{
			if(PetTargetPos_x>=this.x){
				this.x+=2;
			}
			else{
				this.x-=2;
			}
			if(PetTargetPos_y>=this.y){
				this.y+=2;
			}
			else{
				this.y-=2;
			}
			PetmovingTimer+=1;
			if(PetmovingTimer>6*60){
				PetmoveTimer=2*60;
				console.log(this.x,this.y)
			}
		}
	
		// 画面からはみ出ないように制御
		this.x = constrain(this.x, 0, width - this.size);
		this.y = constrain(this.y, 0, height - this.size);
		}
		else{
			PetmoveTimer-=1;
			PetmovingTimer=0;
			PetTargetPos_x = random(this.x-100,this.x+100);
			PetTargetPos_y = random(this.y-100,this.y+100);
		}
	  }

  
	evolve() {
	  // 進化ロジック
	  if (this.energy > 150 && this.level < 3) {
		this.level++;
		this.size += 30; // 進化後のサイズ
	  }
	}
  
	update() {
	  // ペットの属性やアクションの更新ロジック
	  this.energy -= 0.1;
	  this.evolve();

	  fill(255,255,255,185);
	  rect(100,100,50,50);
	  fill(0);
	  textSize(50);
	  text("=",110,135);
	}
  
	display() {
	  // 画像表示
	  //image(petImage, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
	  image(petImage, this.x, this.y, this.size, this.size);
	}
	minigame_1(){//瓦ブレイク
		
		background(255);
		fill(90);
		stroke(3);
		if(gameScreenSelect==96010){
			kawara.visible=true;
		//積み瓦の描画設定
		for(let i = 0;i<nowkawaraCount;i++){//積む瓦の回数繰り返す
		beginShape();
		vertex(x1, y1-(i*10));
		vertex(x2, y2-(i*10));
		vertex(x3, y3-(i*10));
		vertex(x4, y4-(i*10));
		vertex(x5, y5-(i*10));
		vertex(x6, y6-(i*10));
	 endShape(CLOSE);
	 if(i>=nowkawaraCount-1){
		fill(120);
		beginShape();
		vertex(x1+100, y1-(i*10)-100);
		vertex(x4, y4-((i+1)*10));
		vertex(x5, y5-((i+1)*10));
		vertex(x6, y6-((i+1)*10));
		 endShape(CLOSE);
	 }
		}
		
		//0枚になったら10枚に戻す
	if(nowkawaraCount<=0){
		nowkawaraCount=10;
	}
	kawara.draw();
	if(kawaraHP<=5){
		image(img_2,kawara.x-kawara.width/2,kawara.y-kawara.height/2,kawara.width,kawara.height);//ひび割れ描画
	}
	textSize(20);
	fill(0)
	//割った枚数の設定
	text("割った枚数:"+BreakCount,windowWidth/2,windowHeight-300);
	//ゲーム残り時間の設定
	if(GameTimer>0){
		GameTimer-=1;
		text("残り時間"+parseInt(GameTimer/60),windowWidth/2,windowHeight-250);
	}
	else{
	gameScreenSelect=96012;
	}
	//クリックされたら消すヘルプの表示
	if(ClickHelp>=1){
		textSize(75);
		fill(0)
		text("↓Click!!↓",10,300);	
	}
		}
		else if(gameScreenSelect==96011){//説明
			console.log("説明開始");
			kawara.visible=false;//スプライトの非表示
			image(img_1,50,100,windowWidth-200,windowHeight-300);
			textSize(36);
			fill(0);
			text("ゲーム名",windowWidth/2-150,200);//ゲーム名をここに入れる、長さに応じて150のところで横位置調整
			text("瓦をクリックしてたくさん壊そう！",windowWidth/2-500,300);
			text("壊した枚数が多ければ多いほど報酬UP！",windowWidth/2-500,350);
			text("画面クリックでゲームスタート",windowWidth/2-300,450);
		}
		else if(gameScreenSelect==96012){//リザルト
			kawara.visible=false;//スプライトの非表示
			image(img_1,50,imgy,windowWidth-200,windowHeight-300);
			if(imgy<100){
				imgy+=5;
			}
			else{
				textSize(36);
			fill(0);
			text("結果発表！",windowWidth/2-150,200);
			text("割った瓦の枚数    " + BreakCount,windowWidth/2-500,250);
			if(BreakCount>=50){text("クリアランク    S",windowWidth/2-500,300);text("手に入れた餌   ？？＋5",windowWidth/2-500,400);}
			else if(BreakCount>=40){text("クリアランク    A",windowWidth/2-500,300);text("手に入れた餌   ？？＋4",windowWidth/2-500,400);}
			else if(BreakCount>=30){text("クリアランク    B",windowWidth/2-500,300);text("手に入れた餌   ？？＋3",windowWidth/2-500,400);}
			else{text("クリアランク    C",windowWidth/2-500,300);text("手に入れた餌   ？？＋１",windowWidth/2-500,400);}
			text("やめる",250,475);text("もう一度！",windowWidth/2,475);
			}
			
		}
	//デバッグ用テキスト
	/*
	textSize(12);
	text("randamX:"+landx,600,250);
	text("randamY:"+landy,600,300);
	text("mpX:"+mpx,600,350);
	text("mpY:"+mpy,600,400);*/
	}
	minigame_2(){
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
			background(255);
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
	menuUI(){
		fill(255,255,255,185);
		rect(100,100,menuUI_x,menuUI_y);
		fill(255,255,0,185);
		rect(100,100,50,50);
		fill(255);
		for(let i = 0;i < 3;i++){
			image(menuimg_list[i],menuIcon_poslist[i][0]-50,menuIcon_poslist[i][1]-50,100,100)
			//ellipse(menuIcon_poslist[i][0],menuIcon_poslist[i][1],90,90);
		}
		if(menuSelect==1){
	  if(menuUI_x<=350){
		menuUI_x+=35;
	  }
	  if(menuUI_y<=100){
		menuUI_y+=10;
	  }
	}
	else if(menuSelect>=2&&menuSelect<=4){//メニュー画面を広げる
		if(menuUI_x<=435){
			menuUI_x+=35;
		  }
		  if(menuUI_y<=200){
			menuUI_y+=10;
		  }
	}
	  if(menuSelect==1){//メニューを開いた状態
		
		for(let i = 0;i < 3;i++){
			if(mpx >= menuIcon_poslist[i][0] - 45&&mpx <= menuIcon_poslist[i][0] + 45&&mpy >= menuIcon_poslist[i][1] - 45&&mpy <= menuIcon_poslist[i][1] + 45){
				fill(150,150,150,150);
				ellipse(menuIcon_poslist[i][0],menuIcon_poslist[i][1],90,90);
			}
		}
	}
	if(menuSelect>=2){//2回メニューをクリックした状態
		for(let i = 1;i < 4;i++){
			image(gameimg_list[i-1],menuIcon_poslist_2[i][0]-50,menuIcon_poslist_2[i][1]-50,100,100)
			/*fill(255,255,255,100);
			ellipse(menuIcon_poslist_2[i][0],menuIcon_poslist_2[i][1],90,90);*/
			if(mpx >= menuIcon_poslist_2[i][0] - 45&&mpx <= menuIcon_poslist_2[i][0] + 45&&mpy >= menuIcon_poslist_2[i][1] - 45&&mpy <= menuIcon_poslist_2[i][1] + 45){
				fill(150,150,150,150);
				ellipse(menuIcon_poslist_2[i][0],menuIcon_poslist_2[i][1],90,90);
			}
		
	}
	if(menuSelect==2){//ミニゲームメニュー
		image(menuimg_list[0],menuIcon_poslist_2[0][0]-100,menuIcon_poslist_2[0][1]-30,60,60)
		fill(0,0,0,100);
		ellipse(menuIcon_poslist[menuSelect-2][0],menuIcon_poslist[menuSelect-2][1],90,90);
	}
	else if(menuSelect==3){//餌やりメニュー
		image(menuimg_list[1],menuIcon_poslist_2[0][0]-100,menuIcon_poslist_2[0][1]-30,60,60)
		fill(0,0,0,100);
		ellipse(menuIcon_poslist[menuSelect-2][0],menuIcon_poslist[menuSelect-2][1],90,90);
	}
	else if(menuSelect==4){//畑メニュー
		image(menuimg_list[2],menuIcon_poslist_2[0][0]-100,menuIcon_poslist_2[0][1]-30,60,60)
		fill(0,0,0,100);
		ellipse(menuIcon_poslist[menuSelect-2][0],menuIcon_poslist[menuSelect-2][1],90,90);
	}	
	}
}
  }

  function setup() {
	//createCanvas(1000, 800);
	createCanvas(windowWidth-100, windowHeight-100);
	pet = new Pet(width / 2, height / 2);


	/*ミニゲーム用初期設定*/
	frameRate(60);//秒間60回処理
	background(255);//背景生成
	textSize(10);//文字の大きさ
	noStroke();


	//積み瓦の変数設定
	//左上
x1 = 100;
y1 = 300;
//中央
x2 = 300;
y2 = 300;
//中央上
x3 = 400;
y3 = 200;
//右上
x4 = 400;
y4 = 210;
//中央下
x5 = 300;
y5 = 310;
//左下
x6 = 100;
y6 = 310;

/*Smash_ball用*/
//ボールの初期位置設定
landx=windowWidth/2;
landy=windowHeight/2;
/*ボールの設定*/ 
ball = createSprite(landx,landy);	
ball.color="white"
ball.image = img_3;
ball.mass = 1;
ball.restitution = 1.1;
ball.visible = false

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
north_wall.visible = false

south_wall = createSprite(windowWidth/2-50,windowHeight-200);
south_wall.width=windowWidth-300
south_wall.height=5
south_wall.color = "white"
south_wall.collider = 'static';
south_wall.visible = false

west_wall = createSprite(100,windowHeight/2-50);
west_wall.width=5
west_wall.height=windowHeight-300
west_wall.color = "white"
west_wall.collider = 'static';
west_wall.visible = false

east_wall = createSprite(windowWidth-200,windowHeight/2-50);
east_wall.width=5
east_wall.height=windowHeight-300
east_wall.color = "white"
east_wall.collider = 'static';
east_wall.visible = false
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

goal_1.visible=false
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
player.image = petImage;
player.width = 50;
player.height = 50;
player.mass = 1;
player.rotationLock = true;
player.visible = false

GameTimer = 60 * 60;

kawara = createSprite(200,windowHeight-300);	
kawara.color="gray"
//kawara.image="../images/指定の画像"
kawara.width = 200;
kawara.height = 200;
kawara.collider = "static"
kawara.visible = false
//ウィークポイントの設定
landx=random((kawara.x-kawara.width/2)+(kawara.width/5),(kawara.x+kawara.width/2)-(kawara.width/5));//ウィークポイント用x乱数設定
landy=random((kawara.y-kawara.height/2)+(kawara.height/5),(kawara.y+kawara.height/2)-(kawara.height/5));//ウィークポイント用y乱数設定
	/*ここまで*/
  }



  function draw() {
	if(gameScreenSelect==0){
	background(backgroundImage);
	pet.update();
	pet.display();
	pet.autoMove(); // ペットを自動で動かす
	pet.display();
	if(menuSelect == 0){
menuUI_x=0;
menuUI_y=0;
	}
	else if(menuSelect >= 1){
		pet.menuUI();
	}
	}
	else if(gameScreenSelect>=96000){
		if(gameScreenSelect >= 96010 && gameScreenSelect <= 96019){
		pet.minigame_1();
		}
		else if(gameScreenSelect >= 96020 && gameScreenSelect <= 96029){
			pet.minigame_2();
		}
	}
  }
  


  //ミニゲーム用クリックイベント
  function mousePressed() {//マウスのボタンを押したとき処理される
		
console.log(gameScreenSelect);
console.log(Pet.x,Pet.y,PetTargetPos_x,PetTargetPos_y);
if(gameScreenSelect==0){

	console.log("ミニゲーム開始",gameScreenSelect);
if(menuSelect>=1){
	for(let i = 0;i < 3;i++){
		if(mpx >= menuIcon_poslist[i][0] - 45&&mpx <= menuIcon_poslist[i][0] + 45&&mpy >= menuIcon_poslist[i][1] - 45&&mpy <= menuIcon_poslist[i][1] + 45){
			//メニュー画面一段階目
			//menuSelect += i+1;
				menuSelect=i+2;
			i=3;
		}
		else if(mpx >= menuIcon_poslist_2[i+1][0] - 45&&mpx <= menuIcon_poslist_2[i+1][0] + 45&&mpy >= menuIcon_poslist_2[i+1][1] - 45&&mpy <= menuIcon_poslist_2[i+1][1] + 45){
			//ミニゲーム、餌やり、畑遷移
			if(menuSelect == 2){
				gameScreenSelect = 96011 + (10 * i);
			}
			console.log(gameScreenSelect)
		}
		else{
			if(i >= 2){
				menuSelect=0;
			}
		}
}
}
if(mpx>=100&&mpx<=150&&mpy>=100&&mpy<=150){
	if(menuSelect==0){
		menuSelect=1;
	}
}
}


	
	else if(gameScreenSelect==96010){
	if(ClickHelp>0){
		ClickHelp=0;
	}
	//瓦をクリックした時の処理↓
	if(mpx>=landx-kawara.width/5&&mpx<=landx + kawara.width/5&&mpy>=landy-kawara.height/5&&mpy<=landy+kawara.height/5){
		//ウィークポイントをクリックした時の設定
		audio = new Audio('./sounds/weak.mp3')//音声設定用変数
		audio.play();//音を鳴らす
		kawaraHP-=BreakPower*5;//瓦体力(初期値15)-ペットの攻撃力(初期値1,実数)x5
		BreakStamina-=1;//ペットの体力減少
	}
	else if(mpx>=kawara.x-kawara.width/2&&mpx<=kawara.x+kawara.width/2&&mpy>=kawara.y-kawara.height/2&&mpy<=kawara.y+kawara.height/2){
		//瓦を通常通りクリックした場合
		audio = new Audio('./sounds/normal.mp3')//音声設定用変数
		audio.play();//音を鳴らす
		kawaraHP-=BreakPower;//瓦体力(初期値10)-ペットの攻撃力(初期値1,実数)
		BreakStamina-=1;//ペットの体力減少
	}
	if(kawaraHP<=0){
		kawaraHP=kawarapreHP;//瓦体力を初期値に
		BreakCount+=1;//壊した瓦の数増加
		nowkawaraCount-=1;//描画変更用変数変化
		landx=random(kawara.x-kawara.width+(kawara.width/2.5),kawara.x+kawara.width-(kawara.width/2.5));//ウィークポイント用x乱数設定
		landy=random(kawara.y-kawara.height+(kawara.height/2.5),kawara.y+kawara.height-(kawara.height/2.5));//ウィークポイント用y乱数設定
		
	}
}
else if(gameScreenSelect==96011){
	gameScreenSelect=96010;
	
}
else if(gameScreenSelect==96012){
	//もう一度！が押された時の初期化設定
	if(mpx>=windowWidth/2&&mpx<=windowWidth/2+300&&mpy>=400&&mpy<=500){
	gameScreenSelect=96010;
	GameTimer=60*60;
	BreakCount=0
	kawaraHP=10;
	nowkawaraCount=10;
	ClickHelp=1;
	imgy=-50;
	landx=random(kawara.x-kawara.width+(kawara.width/2.5),kawara.x+kawara.width-(kawara.width/2.5));//ウィークポイント用x乱数設定
	landy=random(kawara.y-kawara.height+(kawara.height/2.5),kawara.y+kawara.height-(kawara.height/2.5));//ウィークポイント用y乱数設定
}
}
else if(gameScreenSelect == 96021){
	north_wall.visible = true
	west_wall.visible = true
	east_wall.visible = true
	south_wall.visible = true
	player.visible = true
	ball.visible = true
	goal_1.visible = true	
	player.width = 50;
player.height = 50;
	gameScreenSelect = 96020;
	console.log("スマッシュボール開始")
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
else if(mpx>=200&&mpx<windowWidth/2&&mpy>=400&&mpy<=500){
	//やめるが押された時の設定
	gameScreenSelect=0;
	console.log("やめる設定")

}
}
}
function mouseMoved() {//マウスのボタンを押したとき処理される
	//マウスの位置をmpx,mpyに代入
	if(gameScreenSelect <= 96019 || gameScreenSelect == 96022){
	mpx = mouseX;
	mpy = mouseY;
	}
	
}
function mouseDragged() {//マウスのボタンを押している間処理される
if(gameScreenSelect >= 96020 && gameScreenSelect <= 96029){
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
}
function mouseReleased() {//マウスのボタンを離した時処理される
	playerx=0;
	playery=0;
}
