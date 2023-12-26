let kawara,weakkawara,pet,nextkawara,nowkawaraCount=10,Breakkawara_text,mpx,mpy,imgy=-50;
int = x1=0,x2=0,x3=0,x4=0,x5=0,x6=0,y1=0,y2=0,y3=0,y4=0,y5=0,y6=0;

let audio;//音声設定用変数
//画像の設定
const panelImage = "./images/screen.png";
let img_1 = null;
function preload(){
  img_1 = loadImage(panelImage);    //画像の読み込み
}
/*ゲーム画面の遷移
  96010でゲーム本体、96011でゲームの説明、96012でリザルト*/
let gameScreenSelect=96011;//ゲーム画面遷移用変数

let ClickHelp=1;
let landx,landy,BreakCount=0,kawaraHP=10,kawarapreHP=10;
let GameTimer=2*60;//ミニゲームの時間=実際の時間xフレームレート60
let BreakPower=1;
let BreakStamina=10;

function setup() {
	createCanvas(windowWidth-100, windowHeight-100);//ウィンドウサイズ-100の大きさのキャンバス作成
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


	/*クリックイベントを入れる瓦の設定*/ 
	kawara = createSprite(200,windowHeight-300);	
	kawara.color="gray"
	//kawara.image="../images/指定の画像"
	kawara.width = 200;
	kawara.height = 200;
	/*ペットの設定*/


	//ウィークポイントの設定
	landx=random((kawara.x-kawara.width/2)+(kawara.width/5),(kawara.x+kawara.width/2)-(kawara.width/5));//ウィークポイント用x乱数設定
	landy=random((kawara.y-kawara.height/2)+(kawara.height/5),(kawara.y+kawara.height/2)-(kawara.height/5));//ウィークポイント用x乱数設定
}

function draw(){
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
		kawara.visible=false;//スプライトの非表示
		image(img_1,50,100,windowWidth-200,windowHeight-300);
		textSize(36);
		fill(0);
		text("ゲーム名",windowWidth/2-150,200);//ゲーム名をここに入れる、長さに応じて150のところで横位置調整
		text("瓦をクリックしてたくさん壊そう！",100,300);
		text("壊した枚数が多ければ多いほど報酬UP！",100,350);
		text("画面クリックでゲームスタート",175,450);
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
		text("結果発表！",350,200);
		text("割った瓦の枚数    " + BreakCount,100,250);
		if(BreakCount>=50){text("クリアランク    S",100,300);text("手に入れた餌   ？？＋5",200,400);}
		else if(BreakCount>=40){text("クリアランク    A",100,300);text("手に入れた餌   ？？＋4",200,400);}
		else if(BreakCount>=30){text("クリアランク    B",100,300);text("手に入れた餌   ？？＋3",200,400);}
		else{text("クリアランク    C",100,300);text("手に入れた餌   ？？＋１",200,400);}
		text("やめる",250,475);text("もう一度！",450,475);
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
function mousePressed() {//マウスのボタンを押したとき処理される
	
	//クリックした瞬間のマウスの位置をmpx,mpyに代入
	mpx = mouseX;
	mpy = mouseY;
	if(gameScreenSelect==96010){
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
else if(mpx>=windowWidth/2-300&&mpx<windowWidth/2&&mpy>=400&&mpy<=500){
	//やめるが押された時の設定
	console.log("やめる設定")
}
}
}