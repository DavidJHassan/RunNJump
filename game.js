/*Global Variables*/

var canvas = $("#game");
var screenW = window.innerWidth*0.60;
var screenH = window.innerHeight*0.80;
canvas.width = screenW;
canvas.height = screenH;

var context = canvas[0].getContext("2d");
context.canvas.width = screenW;
context.canvas.height = screenH;
var player = new Player();
var starting_platform = new Platform();
starting_platform.setDimensions(0,Math.round(3*screenH/4), 200,100);
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
	setInterval(createPlatform, 3000);
	setInterval(gameLoop, 1000 / 60); // 60fps
	
}

function gameLoop() 
{
	context.clearRect(0, 0, screenW, screenH);//clear canvas to redraw new frame
	for(i = 0; i<platforms.length; i++){
		platforms[i].draw();
		platforms[i].update();
	}
	
	player.update();
	player.draw();
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














