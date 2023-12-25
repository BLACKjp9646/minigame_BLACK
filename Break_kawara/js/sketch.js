let kawara,pet,nextkawara,Breakkawara_text;

/*ゲーム画面の遷移
  96010でゲーム本体、96011でゲームの説明、96012でリザルト*/
let gameScreenSelect=96011;//ゲーム画面遷移用変数

let landx,landy,BreakCount,kawaraHP=15;
let GameTimer=60;//ミニゲームの時間
let BreakPower=1;
let BreakStamina=10;

function setup() {
	createCanvas(windowWidth-100, windowHeight-100);//ウィンドウサイズ-100の大きさのキャンバス作成
	frameRate(60);//秒間60回処理
	background(255);//背景生成
	textSize(100);//文字の大きさ
	noStroke();

	/*クリックイベントを入れる瓦の設定*/ 
	kawara = new Sprite(200,windowHeight-300)	
	kawara.color="gray"
	//kawara.image="../images/指定の画像"
	kawara.width = 200;
	kawara.height = 200;

	/*ペットの設定*/


	/*積まれた瓦の設定*/
	for (let i=0;i<9;i++){

	}

}

function draw(){

}