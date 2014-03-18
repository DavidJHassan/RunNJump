/*Global Variables*/

var canvas = $("#game");
var context = canvas[0].getContext("2d");

var player = new Player();
var platform = new Platform();

function Player()
{
	this.sprite = new Image();
	this.x = 0;
	this.y = 400;
	this.mLeft = false;
	this.mRight = false;
	this.mUp = false;
	this.mDown = false;
	this.isFalling = true;
	
	this.draw = function(){
		context.drawImage(this.sprite,this.x,this.y);
	}
}

function Platform()
{
	this.x = Math.random()*10;
	this.y = Math.random()*10;
	
	this.draw = function(){
		context.beginPath();
		context.rect(this.x, this.y, 200, 100);
		context.fillStyle = 'yellow';
		context.fill();
		context.lineWidth = 7;
		context.strokeStyle = 'black';
		context.stroke();
	}
}

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




function startGame()
{
	$("#menu").hide();
	canvas.show();
	setInterval(gameLoop, 1000 / 60); // 60fps
}

function gameLoop() 
{
	draw();
	update();

}


function draw()
{
	
	player.draw();
	platform.draw();
}

function update()
{
	if(player.mLeft){
		player.x -= 1;
	}
	
	if(player.mRight){
		player.x += 1;
	}
	
	if(player.mUp){
		player.y -= 1;
	}
	
	if(player.mDown){
		player.y += 1;
	}
	
	if(player.isFalling){;
		player.y = player.y + 1;
	}
	
}
