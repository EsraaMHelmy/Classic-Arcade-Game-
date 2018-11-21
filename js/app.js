// Enemies our player must avoid
var Enemy = function(x ,y) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = this.get_speed();
};


Enemy.prototype.get_speed = function(){
    return Math.floor(Math.random() * (500 - 200+1)+ 200); //floor to remove points l ksor, we can declare Maximum_speed as a const = 500 and minmum_speed 200 

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 500)
        this.x += this.speed * dt;
    else {
        this.x = -100;
        this.speed = this.get_speed(); 
    }    
};



// Draw the enemy on the screen, required method for game
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.sprite = 'images/esraa.png';
    this.x = x;
    this.y = y;
};

//reset function
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};


//update player method 
Player.prototype.update = function() {
    for(let i=0; i < allEnemies.length; i++) {
        if ((this.y == allEnemies[i].y)
            && (this.x < allEnemies[i].x + 101)
            && (this.x + 101 > allEnemies[i].x)) {
            this.reset();
        }
    }

}; 


//render player method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(key) {
    if(key == 'left') {
       this.x -= 100;
    } else if(key == 'right') {
       if(this.x < 400) {
        this.x += 100;
       }
} else if (key == 'up') {
    if(this.y > 40){
        this.y -= 90;
    } else {
            //if the water hit the player a message will appear says wooow
            // then the player will go te original position   
            window.alert("Yahooooooooooo !!! You are reached the water :) ");
            this.reset();
    }
} else if (key == 'down'){
    if(this.y < 400) {
       this.y += 90;    
     }
  }

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [

    new Enemy(0, 40),
    new Enemy(0, 130),
    new Enemy(0, 220)    

];


var player = new Player (200, 400);



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
