var InputSystem = function(entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
    this.start_btn =  document.getElementById('start');
    this.new_game_btn =  document.getElementById('new_game');
    this.pause_btn =  document.getElementById('pause');
    this.level_btn = document.getElementById('level_wrap');
};

InputSystem.prototype.run = function() {
    window.addEventListener('load', this.windowLoad.bind(this));
    window.addEventListener('blur', this.windowBlur.bind(this));
    this.canvas.addEventListener('click', this.onClick.bind(this));
    // this.canvas.addEventListener('touchstart', this.onTouch.bind(this));

    this.pause_btn.addEventListener("click", this.pauseGame.bind(this));
    this.new_game_btn.addEventListener('click', this.newGame.bind(this) );
    this.level_btn.addEventListener('click', this.chooseLevel.bind(this) );
};

InputSystem.prototype.onClick = function() {
    // console.log("click");
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.5;
};

InputSystem.prototype.onTouch = function() {
    // console.log("touchstart");
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

    window.setTimeout(function(){bird.components.physics.status = 'move';}, 200);   

    document.getElementById('score_board').style.display = 'block';
};

InputSystem.prototype.newGame = function() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('intro').style.display = 'block';
    // console.log(this.entities[0]);
};

InputSystem.prototype.pauseGame = function() {
    // console.log('pause');
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

InputSystem.prototype.windowBlur = function() {
    // console.log('pause');
    var bird = this.entities[0];
    if(bird.components.physics.status == 'move'){
        this.pauseGame();
    }
};

InputSystem.prototype.chooseLevel = function() {
    var e = window.event;
    var target = event.target || event.srcElement;
    var click_level = parseInt(target.innerHTML);
    console.log(click_level);
    console.log(typeof(click_level));
    var bird = this.entities[0];
    if(click_level <= bird.components.physics.level){
        bird.components.physics.level = click_level;
        this.onGameStart();
    }
};

InputSystem.prototype.windowLoad = function() {
    var level_wrap = document.getElementById('level_wrap');
    var total = this.entities[0].components.physics.total_level;
    for(var i = 1; i <= total; i++){
        var text_node = document.createElement("div");
        text_node.className += " level";
        text_node.innerHTML = '<button class="level_btn" id="lbtn_' + i +'">' + i + '</button><p id="l' + i + '_star"></p>';
        level_wrap.appendChild(text_node);
    }
    document.getElementById('lbtn_1').className  += 'level_btn_active';
};

exports.InputSystem = InputSystem;