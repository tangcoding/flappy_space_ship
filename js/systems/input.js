var InputSystem = function(entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
    this.start_btn =  document.getElementById('start');
    this.new_game_btn =  document.getElementById('new_game');
    this.pause_btn =  document.getElementById('pause');
};

InputSystem.prototype.run = function() {
    this.canvas.addEventListener('click', this.onClick.bind(this));
    this.pause_btn.addEventListener("click", this.pauseGame.bind(this));
    // this.canvas.addEventListener('touchstart', this.onTouch.bind(this));

    this.start_btn.addEventListener('click', this.onGameStart.bind(this) );
    this.new_game_btn.addEventListener('click', this.newGame.bind(this) );
};

InputSystem.prototype.onClick = function() {
    // console.log("click");
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.7;
};

InputSystem.prototype.onTouch = function() {
    console.log("touchstart");
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.7;
};

InputSystem.prototype.onGameStart = function() {
    // console.log("start");
    document.getElementById('intro').style.display = 'none';
    var bird = this.entities[0];
    bird.components.physics.status = 'move';
    bird.components.physics.score = 0; //reset score
    document.getElementById('score').innerHTML = 0;
    bird.components.physics.position.x = 0; //reset position
    bird.components.physics.position.y = 0.5; 
    bird.components.physics.velocity.x = 0.02; //reset velocity
    bird.components.physics.velocity.y = 0; 

    document.getElementById('score_board').style.display = 'block';
};

InputSystem.prototype.newGame = function() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('intro').style.display = 'block';
    // console.log(this.entities[0]);
};

InputSystem.prototype.pauseGame = function() {
    console.log('pause');
    var bird = this.entities[0];
    if(bird.components.physics.status == 'still'){
        bird.components.physics.status = 'move';
        this.pause_btn.innerHTML = 'Pause';
    }
    else{
        bird.components.physics.status = 'still';
        this.pause_btn.innerHTML = 'Resume';
    }
};

exports.InputSystem = InputSystem;