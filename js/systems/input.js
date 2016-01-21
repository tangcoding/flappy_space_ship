var storageSystem = require("./storage_localstorage");

var InputSystem = function(entities) {
    this.entities = entities;
    this.storageSystem = new storageSystem.StorageSystem(entities);

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
    this.start_btn =  document.getElementById('start');
    this.new_game_btn =  document.getElementById('new_game');
    this.pause_btn =  document.getElementById('pause');
    this.level_btn = document.getElementById('level_wrap');
    this.prev_btn = document.getElementById('prev_page');
    this.next_btn = document.getElementById('next_page');
};

InputSystem.prototype.run = function() {
    window.addEventListener('load', this.windowLoad.bind(this));
    window.addEventListener('blur', this.windowBlur.bind(this));
    window.addEventListener('keypress', this.keyPress.bind(this));
    this.canvas.addEventListener('click', this.onClick.bind(this));
    // this.canvas.addEventListener('touchstart', this.onTouch.bind(this));

    this.pause_btn.addEventListener("click", this.pauseGame.bind(this));
    this.new_game_btn.addEventListener('click', this.newGame.bind(this) );
    this.level_btn.addEventListener('click', this.chooseLevel.bind(this) );
    this.prev_btn.addEventListener('click', this.prev.bind(this) );
    this.next_btn.addEventListener('click', this.next.bind(this) );
};

InputSystem.prototype.onClick = function() {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.5;
};

InputSystem.prototype.onTouch = function() {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.5;
};

InputSystem.prototype.onGameStart = function() {
    document.getElementById('intro').style.display = 'none';
    var bird = this.entities[0];
    document.getElementById('score').innerHTML = ''; //reset stars
    document.getElementById('final_score').innerHTML = '';
    document.getElementById('level').innerHTML = bird.components.physics.level;
    bird.components.physics.position.x = 0; //reset position
    bird.components.physics.position.y = 0.5; 
    bird.components.physics.velocity.x = 0.02; //reset velocity
    bird.components.physics.velocity.y = 0; 
    bird.components.physics.pass_pipe_num = 0;
    if(bird.components.physics.level % 3 ==1){ 
        document.getElementById('main-canvas').style.backgroundColor = '#104E8B';
    }
    else if(bird.components.physics.level % 3 ==2){ 
        document.getElementById('main-canvas').style.backgroundColor = '#33691E';
    }
    else{
        document.getElementById('main-canvas').style.backgroundColor = '#827717';
    }

    window.setTimeout(function(){bird.components.physics.status = 'move';}, 200);   

    document.getElementById('score_board').style.display = 'block';
};

InputSystem.prototype.newGame = function() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('intro').style.display = 'block';
};

InputSystem.prototype.pauseGame = function() {
    var bird = this.entities[0];
    if(bird.components.physics.status == 'still'){
        window.setTimeout(function(){bird.components.physics.status = 'move';}, 200); 
        this.pause_btn.innerHTML = 'Pause';
    }
    else{
        bird.components.physics.status = 'still';
        this.pause_btn.innerHTML = 'Resume';
    }
};

InputSystem.prototype.keyPress = function() {
    var e = window.event;
    if(e.which == 32){
        this.pauseGame();
    }
};

InputSystem.prototype.windowBlur = function() {
    var bird = this.entities[0];
    if(bird.components.physics.status == 'move'){
        this.pauseGame();
    }
};

InputSystem.prototype.chooseLevel = function(event) {
    var e = event || window.event;
    var target = event.target || event.srcElement;
    if(target.nodeName != 'BUTTON'){ target = target.parentElement;}

    var click_level = parseInt(target.id.split('_')[1]);

    var bird = this.entities[0];
    if(click_level <= bird.components.physics.max_level){
        bird.components.physics.level = click_level;
        this.onGameStart();
    }
};

InputSystem.prototype.windowLoad = function() {
    this.storageSystem.onload_setup();
};

InputSystem.prototype.prev = function() {
    this.entities[0].components.physics.base -= 9;
    if(this.entities[0].components.physics.base < 0){
        this.entities[0].components.physics.base = 0;
    }

    this.storageSystem.inprogress_setup();
};

InputSystem.prototype.next = function() {
    this.entities[0].components.physics.base += 9;
    this.storageSystem.inprogress_setup();
};

exports.InputSystem = InputSystem;