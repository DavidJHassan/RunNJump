


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
