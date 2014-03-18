/*Global Variables*/

var canvas = $("#game");
var context = canvas[0].getContext("2d");

var player = new Player();
var platform = new Platform();

/*Game Related*/
function Player()
{
	this.sprite = new Image();
	this.x = 0;
	this.y = 400;
	this.rect = [this.x, this.y, this.sprite.width, this.sprite.height];
	this.mLeft = false;
	this.mRight = false;
	this.mUp = false;
	this.mDown = false;
	this.isFalling = true;
	
	this.draw = function(){
		context.drawImage(this.sprite,this.x,this.y);
	}
	
	this.update = function(){
		
		this.rect = [this.x, this.y, this.sprite.width, this.sprite.height];
		
		if(isCollision()){
			this.isFalling = false;
		}
		else{
			this.isFalling = true;
		}
		
		if(this.mLeft){
			this.x -= 1;
		}
		
		if(this.mRight){
			this.x += 1;
		}
		
		if(this.mUp){
			this.y -= 1;
		}
		
		if(this.mDown){
			this.y += 1;
		}
		
		if(this.isFalling){;
			this.y = this.y + 1;
		}
	}
}

function Platform()
{
	//this.x = Math.random()*800;
	//this.y = Math.random()*800;
	
	this.x = 0;
	this.y = 600;
	this.w = 200;
	this.h = 100;
	this.rect = [this.x, this.y, this.w, this.h];
	
	this.draw = function(){
		context.beginPath();
		context.rect(this.x, this.y, this.w, this.h);
		context.fillStyle = 'yellow';
		context.fill();
		context.lineWidth = 7;
		context.strokeStyle = 'black';
		context.stroke();
	}
}

function isCollision()//Hardcoded atm. Needs to be more generic for multiple platform objects
{
		   return (player.rect[2] >= platform.rect[0] && // X - LHS
		   player.rect[0] <= platform.rect[2] && // X - RHS 
		   player.rect[1] + player.rect[3] == platform.rect[1]); // Y - Height check
}

function startGame()
{
	$("#menu").hide();
	canvas.show();
	setInterval(gameLoop, 1000 / 60); // 60fps
}

function gameLoop() 
{
	draw();
	player.update();

}

function draw()
{
	
	player.draw();
	platform.draw();
}

/*Document related*/
$(document).ready(function() 
{	
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














