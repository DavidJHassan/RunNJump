/*Global Variables*/

/*Canvas related*/
var CSS_COLOR_NAMES = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

var canvas = $("#game");
var screenW = window.innerWidth*0.60;
var screenH = window.innerHeight*0.80;
canvas.width = screenW;
canvas.height = screenH;

var context = canvas[0].getContext("2d");
context.canvas.width = screenW;
context.canvas.height = screenH;

var grd = context.createRadialGradient(238, 50, 10, 238, 50, 300);
var c1 = CSS_COLOR_NAMES[Math.round(Math.random()*CSS_COLOR_NAMES.length)];
var c2 = CSS_COLOR_NAMES[Math.round(Math.random()*CSS_COLOR_NAMES.length)];

/*Object creation related*/
var audio = new Audio();

var player = new Player();
var starting_platform = new Platform();
starting_platform.setDimensions(0,Math.round(3*screenH/4), 1000,100);
var platforms = new Array();
platforms[0] = starting_platform;

/*Game state related*/
var level = 1;
var score = 0;

var updateTimer;
var gameTimer;
var createTimer;

/*Game Related*/
function isCollision()
{			
		var isCollision = false;
		
		for(i = 0; i<platforms.length; i++){
			
		   if(player.rect[0] + player.rect[2] >= platforms[i].rect[0] && // X - LHS
		   player.rect[0] <= platforms[i].rect[0] + platforms[i].rect[2] && // X - RHS 
		   player.rect[1] + player.rect[3] == platforms[i].rect[1])// Y - Height check
		   {
			   isCollision = true;
		   }
	   }
	   
	   return isCollision;
}

function removeOffScreen()
{
	var pObjs = new Array();
	for(i = 0; i<platforms.length; i++){
		if(platforms[i].rect[0] + platforms[i].rect[2] < 0){
			pObjs.push(platforms[i]);
		}
	}
	
	for(i = 0; i<pObjs.length; i++){
		platforms.splice(platforms.indexOf(pObjs[i]), 1);
	}
	
}

function startGame()
{
	audio.loop = true;
	audio.play();
	$("#menu").hide();
	canvas.show();
	updateTimer = setInterval(updateGame, 30000);
	createTimer = setInterval(createPlatform, 3000);
	gameTimer = setInterval(gameLoop, 1000 / 60); // 60fps
	
}

function gameLoop() 
{
	if(!isGameOver()){//then do game logic
		context.clearRect(0, 0, screenW, screenH);//clear canvas to redraw new frame
		
		context.rect(0, 0, canvas.width, canvas.height);
		var grd = context.createRadialGradient(238, 50, 10, 238, 50, 300);
		grd.addColorStop(0, c1);
		grd.addColorStop(1, c2);

		context.fillStyle = grd;
		context.fill();
		
		removeOffScreen();
		
		for(i = 0; i<platforms.length; i++){
			platforms[i].draw();
			platforms[i].update();
		}
		
		player.update();
		player.draw();
		
		score += 5;
		$("#gamescore").text("Score: "+score);
	}
	else{//stop doing game logic and display game over screen
		clearInterval(updateTimer);
		clearInterval(createTimer);
		clearInterval(gameTimer);
		//Restart options here
		$("#gameover").show();
		$("#restartButton").click(reload);
		$("#gamelevel").css({"top":"45%", "left":"50%", "font-size": "25pt", "color": "red", "background": "white", "border": "1px solid red"});
		$("#gamescore").css({"top":"50%", "left":"50%", "font-size": "25pt", "color": "red", "background": "white", "border": "1px solid red"});
	}	
}

function reload()
{
	location.reload()
}

function updateGame()
{
	level += 1;
	$("#gamelevel").text("Level: "+level);
	c1 = CSS_COLOR_NAMES[Math.round(Math.random()*CSS_COLOR_NAMES.length)];
	c2 = CSS_COLOR_NAMES[Math.round(Math.random()*CSS_COLOR_NAMES.length)];	
}

function createPlatform()
{
	platforms.push(new Platform());
}

$(document).ready(function() 
{	
	$("#menu").width(screenW);
	$("#menu").height(screenH);
	$("#game").hide();
	loadAssets();
}
);

function loadAssets()
{
	
	 player.sprite.src = 'assets/spritesheet.png';
	 audio.src = 'assets/davidsver.mp3';
	 $(player.sprite).load(function()
	 {	
		 $("#startButton").click(startGame);
		

	 });
	  
}

function isGameOver(){
	return (player.y > screenH);	
}
