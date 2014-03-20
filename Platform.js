function Platform()
{
	//this.x = Math.random()*800;
	//this.y = Math.random()*800;
	
	this.x = screenW;
	this.y = 600;
	this.w = 20;
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
	
	this.setDimensions = function(x,y,w,h){//Used to overwrite random generated blocks (used for starting block)
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.rect = [this.x, this.y, this.w, this.h];
	}
	
	this.update = function(){
		this.x -= 1;
		this.rect = [this.x, this.y, this.w, this.h];
	}
	
}
