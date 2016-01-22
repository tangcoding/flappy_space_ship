(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var RectCollisionComponent = function(entity, size) {
    this.entity = entity;
    this.size = size;
    this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

RectCollisionComponent.prototype.collideCircle = function(entity) {
    return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var sizeA = this.size;
    var sizeB = entity.components.collision.size;

    var leftA = positionA.x;
    var rightA = positionA.x + sizeA.x ;
    var bottomA = positionA.y ;
    var topA = positionA.y + sizeA.y ;

    var leftB = positionB.x ;
    var rightB = positionB.x + sizeB.x ;
    var bottomB = positionB.y ;
    var topB = positionB.y + sizeB.y;

    return !(leftA > rightB || leftB > rightA ||
             bottomA > topB || bottomB > topA);
};

exports.RectCollisionComponent = RectCollisionComponent;
},{}],2:[function(require,module,exports){
var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {
	 var position = this.entity.components.physics.position;
     var size = this.entity.components.physics.size;
     // console.log("x: "+ position.x + "; y: " + position.y);

	context.save();
    //change spaceship figure as level changes
    var level = document.getElementById("level").innerHTML;
    level = parseInt(level);
    var img = document.getElementById("bird1");
    if(level%2 == 0){
        img = document.getElementById("bird2");
    }

    context.drawImage(img, position.x, position.y, size.x, size.y);
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],3:[function(require,module,exports){
var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {

	 var position = this.entity.components.physics.position;
	 var size = this.entity.components.physics.size;

	context.save();
    //change rock figure as level changes
    var level = document.getElementById("level").innerHTML;
    level = parseInt(level);
    var img = document.getElementById("rock1");
    if(level%3 == 2){
        img = document.getElementById("rock2");
    }
    else if(level%3 == 0){
        img = document.getElementById("rock3");
    }

    context.drawImage( img, position.x , position.y , size.x, size.y);
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],4:[function(require,module,exports){
var StarGraphicsComponent = function(entity) {
    this.entity = entity;
};

StarGraphicsComponent.prototype.draw = function(context) {

	 var position = this.entity.components.physics.position;
     var size = this.entity.components.physics.size;

	context.save();
    var img = document.getElementById("star");
    context.drawImage( img, position.x , position.y , size.x, size.y);
    context.restore();
};

exports.StarGraphicsComponent = StarGraphicsComponent;
},{}],5:[function(require,module,exports){
var PhysicsComponent = function(entity) {
    this.entity = entity;
    this.type = "rect";
    this.status = 'still';
    this.level = 1;
    this.max_level = 1;
    this.pass_pipe_num = 0;
    this.rest_pipe_num = false;
    this.base = 0;

    this.size= {
        x: 0.07,
        y: 0.06
    };

    this.position = {
        x: 0,
        y: 0
    };
    this.velocity = {
        x: 0,
        y: 0
    };
    this.acceleration = {
        x: 0,
        y: -1.5
    };
};

PhysicsComponent.prototype.update = function(delta) {
    // this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;

    // this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
    // console.log("x: "+ this.position.x + "; y: " + this.position.y);
};

exports.PhysicsComponent = PhysicsComponent;
},{}],6:[function(require,module,exports){
var PhysicsComponent = function(entity) {
    this.entity = entity;
    this.name = "pipe";
    this.type = 'rect';
    this.pass = false;

    this.size= {
        x: 0.1,
        y: 0.6
    };

    this.position = {
        x: 0.5 ,
        y: 0 
    };
    this.velocity = {
        x: -0.22,
        y: 0
    };
};

PhysicsComponent.prototype.update = function(delta) {

    this.position.x += this.velocity.x * delta;
    // this.position.y += this.velocity.y * delta;
    // console.log("x: "+ this.position.x + "; y: " + this.position.y);
};

exports.PhysicsComponent = PhysicsComponent;
},{}],7:[function(require,module,exports){
var PhysicsComponent = function(entity) {
    this.entity = entity;
    this.name = "star";
    this.type = 'rect';
    this.pick = false;


    this.size= {
        x: 0.02,
        y: 0.03
    };

    this.position = {
        x: 0.5 ,
        y: 0 
    };
    this.velocity = {
        x: -0.22,
        y: 0
    };
};

PhysicsComponent.prototype.update = function(delta) {

    this.position.x += this.velocity.x * delta;
    // this.position.y += this.velocity.y * delta;
    // console.log("x: "+ this.position.x + "; y: " + this.position.y);
};

exports.PhysicsComponent = PhysicsComponent;
},{}],8:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/bird_physics");
var collisionComponent = require("../components/collision/rect");
// var settings = require("../settings");

var Bird = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.5;
    // physics.acceleration.y = -2;

    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
	var collision = new collisionComponent.RectCollisionComponent(this, physics.size);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };

    // console.log(this.components.collision);

};

Bird.prototype.onCollision = function(entity) {
    // console.log("Bird collided with entity:", entity);
    // this.components.physics.position.x = 0;
    // this.components.physics.position.y = 0.5;
};

exports.Bird = Bird;
},{"../components/collision/rect":1,"../components/graphics/bird":2,"../components/physics/bird_physics":5}],9:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/pipe_physics");
var collisionComponent = require("../components/collision/rect");


var Pipe = function( pipe_y, pipe_size) {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = pipe_y ;
    physics.size.x = pipe_size;
    physics.size.y = pipe_size;


    var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    var collision = new collisionComponent.RectCollisionComponent(this, physics.size);
    
    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };

};

exports.Pipe = Pipe;
},{"../components/collision/rect":1,"../components/graphics/pipe":3,"../components/physics/pipe_physics":6}],10:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/star");
var physicsComponent = require("../components/physics/star_physics");
var collisionComponent = require("../components/collision/rect");


var Star = function( star_y) {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = star_y ;


    var graphics = new graphicsComponent.StarGraphicsComponent(this);
    var collision = new collisionComponent.RectCollisionComponent(this, physics.size);
    
    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };

};

exports.Star = Star;
},{"../components/collision/rect":1,"../components/graphics/star":4,"../components/physics/star_physics":7}],11:[function(require,module,exports){

var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');

var bird = require('./entities/bird');
// var pipe = require('./entities/pipe');

var FlappyBird = function() {
    this.entities = [new bird.Bird()];

    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
};

FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.input.run();
};


exports.FlappyBird = FlappyBird;
},{"./entities/bird":8,"./systems/graphics":14,"./systems/input":15,"./systems/physics":16}],12:[function(require,module,exports){
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
    var app = new flappyBird.FlappyBird();
    app.run();
});

// document.getElementById('start').addEventListener('click', function(){
// 	    console.log("start");
// 	    document.getElementById('intro').style.display = 'none';
// 	    app = new flappyBird.FlappyBird();
// 	    app.run();
// });

},{"./flappy_bird":11}],13:[function(require,module,exports){
// var storageSystem = require("./storage_indexdb");
var storageSystem = require("./storage_localstorage");

var CollisionSystem = function(entities) {
    this.entities = entities;
    this.end_game = false;
    this.storageSystem = new storageSystem.StorageSystem(entities);
};

CollisionSystem.prototype.tick = function() {

    this.end_game = false;
    var entityA = this.entities[0];
    if(entityA.components.physics.position.y < 0 || entityA.components.physics.position.y > 1){
        this.end_game = true;
    }

    var del_idx = null;

    for (var i=1; i<this.entities.length; i++) {
        if(this.end_game) break;

        var entityB = this.entities[i];
        if (!'collision' in entityA.components) {
            continue;
        }

        if (!entityA.components.collision.collidesWith(entityB)) {
            // add score if passing a pipe
            if(entityB.components.physics.name == 'pipe' && !entityB.components.physics.pass&& entityB.components.physics.position.x + entityB.components.physics.size.x < entityA.components.physics.position.x){
                entityB.components.physics.pass = true;
                entityA.components.physics.pass_pipe_num += 1;

                if(entityA.components.physics.pass_pipe_num >= 20){
                    this.end_game = true;
                    break;
                }
            }
            continue;
        }
        else{
            if(entityB.components.physics.name == 'pipe'){ //collide with pipes
                this.end_game = true;
            }
            else if(entityB.components.physics.name == 'star' && !entityB.components.physics.pick){
                entityB.components.physics.pick = true;
                del_idx = i;
                document.getElementById('score').innerHTML += '&star;';
            }
        }

        // if (entityA.components.collision.onCollision) {
        //     // entityA.components.collision.onCollision(entityB);
        //     this.end_game = true;
        // }
    }
    // delete star that is picked
    if(del_idx != null){
        this.entities.splice(del_idx,1);
    }
 
    if(this.end_game){  // if game end

        this.entities.length = 1;
        entityA.components.physics.status = "still";
        entityA.components.physics.reset_pipe_num = true; // tell system to reset pipe_num
        entityA.components.physics.position.x = 0; //reset position
        entityA.components.physics.position.y = 0.5; 

        if(entityA.components.physics.pass_pipe_num < 20){
            document.getElementById('result_text').innerHTML='Level Failed';
            document.getElementById('final_score').innerHTML = '';
        }
        else{
            document.getElementById('result_text').innerHTML='Level Complete';
            var lbtn_id = 'l' + entityA.components.physics.level + '_star'; // update stars in intro page
            document.getElementById('final_score').innerHTML = document.getElementById('score').innerHTML;
            var old_text = document.getElementById(lbtn_id).innerHTML; 
            var new_text = document.getElementById('final_score').innerHTML;
            if(new_text.length > old_text.length){ //update when get more stars
                document.getElementById(lbtn_id).innerHTML = new_text; 
            }

            if(entityA.components.physics.level + 1> entityA.components.physics.max_level ){
                entityA.components.physics.max_level = entityA.components.physics.level + 1;
            }
            if(entityA.components.physics.max_level > entityA.components.physics.base + 9){
                entityA.components.physics.base += 9;
                this.storageSystem.inprogress_setup();
            }
            var lbtn_id = 'lbtn_' + entityA.components.physics.max_level ;
            document.getElementById(lbtn_id).className  += ' level_btn_active';
        }

        document.getElementById('result').style.display='block';
        document.getElementById('score_board').style.display = 'none';
        this.storageSystem.store_score();
    }
};


exports.CollisionSystem = CollisionSystem;
},{"./storage_localstorage":17}],14:[function(require,module,exports){
var pipe = require('../entities/pipe');
var star = require('../entities/star');

var GraphicsSystem = function(entities) {
    this.entities = entities;
    // Canvas is where we draw
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');
    this.anim = false;
    this.pipe_num = 0;
};

GraphicsSystem.prototype.run = function() {
    // Run the render loop
    // window.requestAnimationFrame(this.tick.bind(this));
    window.setInterval(this.tick.bind(this), 1000 /60);
    window.setInterval(this.add_pipes_star.bind(this), 2000);
};

GraphicsSystem.prototype.tick = function() {

    // Set the canvas to the correct size if the window is resized
    if (this.canvas.width != this.canvas.offsetWidth ||
        this.canvas.height != this.canvas.offsetHeight) {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }


    // Clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.save();
    
    this.context.translate(this.canvas.width / 2, this.canvas.height);
    this.context.scale(this.canvas.width, -this.canvas.height);

    // Rendering goes here
    var del_idx = [];
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!'graphics' in entity.components) {
            continue;
        }
        var position = entity.components.physics.position; 
        if( position.x < -0.5 ){
            del_idx.push(i); // record entities indexs out of the current view
            continue; // not draw entities out of the current view
        }

        entity.components.graphics.draw(this.context);
    }

    this.context.restore();
    for(var i = del_idx.length-1; i > 0; i--){// remove entities out of the current view
        this.entities.splice(del_idx[i],1);
    }    

    // Continue the render loop
    // window.requestAnimationFrame(this.tick.bind(this));
    
};

GraphicsSystem.prototype.add_pipes_star = function() {
    var level = this.entities[0].components.physics.level%3;
    var reset = this.entities[0].components.physics.reset_pipe_num;

    if(reset){ this.pipe_num = 0; this.entities[0].components.physics.reset_pipe_num = false;}

    if(this.entities[0].components.physics.status == 'move' && this.pipe_num <20){

        var random_range = function(min, max){
            return Math.random()* (max-min) + min; 
        };

        var pipe_y = random_range(0, 0.35 + level*0.03); //randomly set the left_bottom cornor of pipe
        var pipe_size1 = random_range(0.15, 0.22); // random pipe_size
        var pipe_gap = random_range(0.03, 0.06);

        pipe_gap += pipe_size1 + 0.22 +  level*0.02;
        var pipe_size2 = random_range(0.15, 0.22);
        this.entities.push(new pipe.Pipe(pipe_y, pipe_size1));
        this.entities.push(new pipe.Pipe(pipe_y + pipe_gap, pipe_size2)); // draw a pair of pipes

        this.pipe_num += 2;
        // console.log(this.pipe_num);

        if(this.pipe_num%3 == 0){
            var adj = 0.02 +  level*0.01;
            var star_y_min = pipe_y+ pipe_size1 + adj;
            var star_y = random_range(star_y_min, star_y_min + adj); // random star in the gap region
            this.entities.push(new star.Star(star_y));
        }
    }

};


exports.GraphicsSystem = GraphicsSystem;
},{"../entities/pipe":9,"../entities/star":10}],15:[function(require,module,exports){
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

    if( bird.components.physics.level%2 == 1 ){
        bird.components.physics.acceleration.y = -1.2; //reset velocity based on level 
    }
    else{
        bird.components.physics.acceleration.y = -1.2; //reset velocity based on level
    }

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
},{"./storage_localstorage":17}],16:[function(require,module,exports){
var collisionSystem = require("./collision");

var PhysicsSystem = function(entities) {
    this.entities = entities;
    this.collisionSystem = new collisionSystem.CollisionSystem(entities);
};

PhysicsSystem.prototype.run = function() {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 1000 /60);
};

PhysicsSystem.prototype.tick = function() {
    if(this.entities[0].components.physics.status == 'move') {
        for (var i=0; i<this.entities.length; i++) {
            var entity = this.entities[i];
            if (!'physics' in entity.components) {
                continue;
            }

            entity.components.physics.update(1/60);
        }
        
        this.collisionSystem.tick();
    }
};

exports.PhysicsSystem = PhysicsSystem;
},{"./collision":13}],17:[function(require,module,exports){
var StorageSystem = function(entities) {
    this.entities = entities;
};

StorageSystem.prototype.support_local_storage = function() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (error) {
    return false;
  }
};

StorageSystem.prototype.store_score = function() {

    if(!this.support_local_storage){return false;}

    localStorage["fss.max_level"] = this.entities[0].components.physics.max_level;
    localStorage["fss.base"] = this.entities[0].components.physics.base;

    var star_obj = {};
    if(localStorage["fss.level_star"] != null){
        star_obj = JSON.parse(localStorage["fss.level_star"]);
    }
    var finished_level = this.entities[0].components.physics.level; 
    var text = document.getElementById('final_score').innerHTML;
    if( !star_obj[finished_level] ){
        star_obj[finished_level] = text;
    }
    else{
        if(text.length > star_obj[finished_level].length){ // update when have more stars
            star_obj[finished_level] = text;
        }
    }


    localStorage["fss.level_star"] = JSON.stringify(star_obj);
};

StorageSystem.prototype.onload_setup = function () {
    if(!this.support_local_storage){return false;}

    var max_level = 1;
    if(localStorage["fss.max_level"]!= null){
        max_level = parseInt(localStorage["fss.max_level"]);
    }
    this.entities[0].components.physics.max_level = max_level;

    var base = 0;
    if(localStorage["fss.base"]!= null){
        base = parseInt( localStorage["fss.base"] );
    }
    this.entities[0].components.physics.base = base;   

    var star_obj = {};
    if(localStorage["fss.level_star"] != null){
        star_obj = JSON.parse(localStorage["fss.level_star"]);
    }
    this.show_score(max_level, base, star_obj);
}

StorageSystem.prototype.inprogress_setup = function () {
    if(!this.support_local_storage){return false;}

    var max_level = this.entities[0].components.physics.max_level;
    localStorage["fss.max_level"] = max_level;
    var base = this.entities[0].components.physics.base;
    localStorage["fss.base"] = base;   

    var star_obj = {};
    if(localStorage["fss.level_star"] != null){
        star_obj = JSON.parse(localStorage["fss.level_star"]);
    }

    this.show_score(max_level, base, star_obj);
}


StorageSystem.prototype.show_score = function(max_level, base, star_obj) {

    var level_wrap = document.getElementById('level_wrap');
    level_wrap.innerHTML = '';
    // console.log(star_obj);

    for(var i = 1; i <= 9; i++){
        var level_num = i + base;
        var text_node = document.createElement("button");
        text_node.className += " level_btn";
        text_node.id = "lbtn_" + level_num;

        var star_text = ''; // write star info
        if(star_obj[level_num]){ star_text = star_obj[level_num] };

        text_node.innerHTML = '<p class="ltext">' + level_num + '</p><p class="star_text" id="l' + level_num + '_star">' + star_text + '</p>';

        if(level_num <= max_level){
            text_node.className += " level_btn_active";
        }

        level_wrap.appendChild(text_node);
    }
};

exports.StorageSystem = StorageSystem;
},{}]},{},[12]);
