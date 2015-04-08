var getRandInt = function(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}


var checkCollisions = function() {
    allEnemies.forEach(function(enemy) {
        //check boundaries or "boxes" around player and enemy
        if (enemy.x < player.x + 50 &&
            enemy.x + 50 > player.x &&
            enemy.y < player.y + 50 &&
            enemy.y + 50 > player.y) {
                player.restart();
        }
    });
}


//////////////////////////////////////////////////////////////////////


//ENEMY CLASS
var Enemy = function() {
    //choose one of three possible roads for enemy to patrol
    this.road = getRandInt(1, 3);

    //set enemy starting (x,y) coordinates
    this.x = getRandInt(0, -505);
    this.y = this.road * 75;

    //pick a speed for enemy
    this.speed = getRandInt(50, 150);

    //image for enemy
    this.sprite = 'images/enemy-bug.png';
}


//update enemy position
//parameter (dt) = time delta between ticks
Enemy.prototype.update = function(dt) {
    //update x position as a function of time
    //distance traveled = speed * change in time
    this.x += this.speed * dt;

    //when enemy moves off screen, reset x position
    if (this.x > 505) {
        this.x = -303;
    }
}

// draw enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


/////////////////////////////////////////////////////////////////////////


//PLAYER CLASS

var Player = function() {
/*
    Use width (x) and height (y) dimensions of tiles
    to determine starting position, and
    set starting (x,y) coordinates
*/
    this.xDim = 101;
    this.yDim = 80;

    this.x = this.xDim * 2;
    this.y = this.yDim * 4;

    //set image for player
    this.sprite = 'images/char-boy.png';
}


Player.prototype.update = function() {
    checkCollisions();
}


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


Player.prototype.restart = function() {
    //reset player to starting position
    this.xDim = 101;
    this.yDim = 80;

    this.x = this.xDim * 2;
    this.y = this.yDim * 4;
}


Player.prototype.handleInput = function(key) {
    if (key === 'right') {
        //mind the boundaries
        if (this.x < 404) {
            this.x += 101;
        }
    } else if (key === 'left') {
        //mind the boundaries
        if (this.x > 0) {
            this.x -= 101;
        }
    } else if (key === 'up') {
        //mind the boundaries
        if (this.y < 150) {
            this.y -= 83;
            this.restart();
        } else if (this.y > 83) {
            this.y -= 83;
        }
    } else if (key === 'down') {
        //mind the boundaries
        if (this.y < 375) {
            this.y += 83;
        }
    }
};


///////////////////////////////////////////////////////////////////////////


//INSTANTIATION

//place all enemy objects in an array called allEnemies
var allEnemies = [];


//create enemies
for (var i = 0; i < 8; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}


//place player object in a variable called player
var player = new Player();


//listen for key presses and send keys to Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
