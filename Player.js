function Player()
{
	this.sprite = new Image();
	this.x = 0;
	this.y = Math.round(screenH/2);
	this.rect = [this.x, this.y, this.sprite.width, this.sprite.height];
	this.mLeft = false;
	this.mRight = false;
	this.mUp = false;
	this.mDown = false;
	this.isFalling = true;
	this.jump_timer = 0;
	this.canJump =  false;
	
	this.draw = function(){
		context.drawImage(this.sprite,this.x,this.y);
	}
	
	this.update = function(){
		
		this.rect = [this.x, this.y, this.sprite.width, this.sprite.height];
		
		if(isCollision()){
			this.isFalling = false;
			this.canJump = true;
			
			clearTimeout(this.jump_timer);
			this.jump_timer = 0;
		}
		else{
			this.isFalling = true;
		}
		
		if(this.mLeft){
			this.x -= 4;
		}
		
		if(this.mRight){
			this.x += 4;
		}
		
		if(this.mUp && this.canJump){
			if(this.jump_timer == 0){
				this.jump_timer = setTimeout(jumpTimer,1000);
			}
			this.y -= 4;
		}
		
		if(this.mDown && !this.isFalling){
			this.canJump = false;
			this.y += 4;
		}
		
		if(this.isFalling){;
			this.y = this.y + 1;
		}
	}
}

function jumpTimer()
{
	player.canJump = false;
}

