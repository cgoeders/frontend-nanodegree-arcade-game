var getRandInt = function(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}


var checkCollisions = function() {
    allEnemies.forEach(function(enemy){
        if(enemy.left < player.right &&
            enemy.right > player.left &&
            enemy.top < player.bottom &&
            enemy.bottom > player.top) {
                Player.restart();
        }
    });
}

var restart = function() {
    //reset screen

}



//////////////////////////////////////////////////////////////////////



// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //choose one of three possible roads for enemy to patrol
    this.road = getRandInt(1, 3);

    //set enemy (x,y) coordinates
    this.x = 0;
    this.y = this.road * 83;

    this.right = this.x + 83;
    this.left = this.x;
    this.top = this.y;
    this.bottom = this.y + 101;

    //pick a speed for enemy
    this.speed = getRandInt(10, 50);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //TODO: handle collisions with player
    checkCollisions();




    //TODO: limit number of enemies generated per row


    //TODO: create enemies if one doesn't already exist on line (easy mode)



}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/////////////////////////////////////////////////////////////////////////



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    //use width (x) and height (y) dimensions of tiles
    //to determine starting position, and
    //set starting (x,y) coordinates
    this.xDim = 101;
    this.yDim = 83;

    this.x = this.xDim * 2;
    this.y = this.yDim * 4;

    this.right = this.x + 83;
    this.left = this.x;
    this.top = this.y;
    this.bottom = this.y + 101;

    //set image for player
    this.sprite = 'images/char-boy.png';
}


Player.prototype.update = function() {
    checkCollisions();
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    if (key === 'right') {
        //verify valid move
        if (this.right + 101 <= 505) {
            this.x += 101;
        }
    } else if (key === 'left') {
        //verify valid move
        if (this.left - 101 >= 0) {
            this.x -= 101;
        }
    } else if (key === 'up') {
        //verify valid move
        if (this.top - 83 >= 83) {
            this.y -= 83;
        }
    } else if (key === 'down') {
        //verify valid move
        if (this.y + 83 <= 606) {
            this.y += 83;
        }
    }
};



///////////////////////////////////////////////////////////////////////////



// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies

var allEnemies = [];
var enemy = new Enemy();
allEnemies.push(enemy);


// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
