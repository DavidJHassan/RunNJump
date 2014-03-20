function Platform()
{
	/*Using external variables screenW, screenH and CSS_COLOR_NAMES*/
	this.x = screenW + Math.random()*screenW;
	this.y = Math.round(Math.random()*screenH);
	this.w = Math.random()*200;
	this.h = this.y;
	this.rect = [this.x, this.y, this.w, this.h];
	this.fillColour = Math.round(Math.random()*CSS_COLOR_NAMES.length);
	this.strokeColour = Math.round(Math.random()*CSS_COLOR_NAMES.length);
	
	
	this.draw = function(){
		context.beginPath();
		context.rect(this.x, this.y, this.w, this.h);
		context.fillStyle = CSS_COLOR_NAMES[this.fillColour];
		context.fill();
		context.lineWidth = 7;
		context.strokeStyle =  CSS_COLOR_NAMES[this.strokeColour];
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
