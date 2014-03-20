/*Global Variables*/

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

var player = new Player();
var starting_platform = new Platform();
starting_platform.setDimensions(0,Math.round(3*screenH/4), 1000,100);
var platforms = new Array();
platforms[0] = starting_platform;


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

function startGame()
{
	$("#menu").hide();
	canvas.show();
	//setInterval(updateGame, 5000);
	setInterval(createPlatform, 2000);
	setInterval(gameLoop, 1000 / 60); // 60fps
	
}

function gameLoop() 
{
	context.clearRect(0, 0, screenW, screenH);//clear canvas to redraw new frame
	grd = context.createRadialGradient(238, 50, 10, 238, 50, 300);
	grd.addColorStop(0, c1);
	grd.addColorStop(1, c2);
	context.fillStyle = grd;
	context.fill();
	
	for(i = 0; i<platforms.length; i++){
		platforms[i].draw();
		platforms[i].update();
	}
	
	player.update();
	player.draw();
}

function updateGame()
{
	grd = context.createRadialGradient(238, 50, 10, 238, 50, 300);
	c1 = CSS_COLOR_NAMES[Math.round(Math.random()*CSS_COLOR_NAMES.length)];
	c2 = CSS_COLOR_NAMES[Math.round(Math.random()*CSS_COLOR_NAMES.length)];
	
	grd.addColorStop(0, c1);
	grd.addColorStop(1, c2);
	context.fillStyle = grd;
	context.fill();
	
}


function createPlatform()
{
	platforms.push(new Platform());
}


/*Document related*/
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
	
	 player.sprite.src = 'circle.png';
	 $(player.sprite).load(function()
	 {	
		 $("#startButton").click(startGame);
	 });
	  
}

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
			player.mLeft = true;
        break;

        case 38: // up
			player.mUp = true;
        break;

        case 39: // right
			player.mRight = true;
        break;

        case 40: // down
			player.mDown = true;
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

$(document).keyup(function(e) {
    switch(e.which) {
        case 37: // left
			player.mLeft = false;
        break;

        case 38: // up
			player.mUp = false;
			player.canJump = false;
        break;

        case 39: // right
			player.mRight = false;
        break;

        case 40: // down
			player.mDown = false;
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});














