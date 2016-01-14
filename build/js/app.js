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
    var image = document.getElementById("bird");
    context.drawImage(image, position.x, position.y, size.x, size.y);
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
	 // console.log(position.y );

	context.save();
    var img = document.getElementById("rock");
    context.drawImage( img, position.x , position.y , size.x, size.y);
    // context.fillStyle ="green";
    // context.fillRect(position.x , position.y , size.x, size.y);
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],4:[function(require,module,exports){
var PhysicsComponent = function(entity) {
    this.entity = entity;
    this.type = "rect";
    this.status = 'still';
    this.score = 0;

    this.size= {
        x: 0.07,
        y: 0.07
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
},{}],5:[function(require,module,exports){
var PhysicsComponent = function(entity) {
    this.entity = entity;
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
    this.position.y += this.velocity.y * delta;
    // console.log("x: "+ this.position.x + "; y: " + this.position.y);
};

exports.PhysicsComponent = PhysicsComponent;
},{}],6:[function(require,module,exports){
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
},{"../components/collision/rect":1,"../components/graphics/bird":2,"../components/physics/bird_physics":4}],7:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/pipe_physics");
var collisionComponent = require("../components/collision/rect");


var Pipe = function( pipe_y) {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = pipe_y ;

    var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    var collision = new collisionComponent.RectCollisionComponent(this, physics.size);
    
    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };

};

exports.Pipe = Pipe;
},{"../components/collision/rect":1,"../components/graphics/pipe":3,"../components/physics/pipe_physics":5}],8:[function(require,module,exports){

var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

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
    window.setInterval(this.add_pipes.bind(this), 2000);
};

FlappyBird.prototype.add_pipes = function() {
    if(this.entities[0].components.physics.status == 'move'){
        var random_range = function(min, max){
            return Math.random()* (max-min) + min; 
        };

        var pipe_y = random_range(-0.5, 0); //randomly set the left_bottom cornor of pipe
        var pipe_gap = random_range(0.03, 0.06);
        pipe_gap += 0.85;
        this.entities.push(new pipe.Pipe(pipe_y));
        this.entities.push(new pipe.Pipe(pipe_y + pipe_gap)); // draw a pair of pipes
    }
};


exports.FlappyBird = FlappyBird;
},{"./entities/bird":6,"./entities/pipe":7,"./systems/graphics":11,"./systems/input":12,"./systems/physics":13}],9:[function(require,module,exports){
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

},{"./flappy_bird":8}],10:[function(require,module,exports){
var storageSystem = require("./storage_indexdb");
// var storageSystem = require("./storage_localstorage");

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


    for (var i=1; i<this.entities.length; i++) {
        if(this.end_game) break;

        var entityB = this.entities[i];
        if (!'collision' in entityA.components) {
            continue;
        }

        if (!entityA.components.collision.collidesWith(entityB)) {
            // add score if passing a pipe
            if(!entityB.components.physics.pass&& entityB.components.physics.position.x + entityB.components.physics.size.x < entityA.components.physics.position.x){
                entityA.components.physics.score += 50;
                entityB.components.physics.pass = true;
                document.getElementById('score').innerHTML = entityA.components.physics.score;
                document.getElementById('final_score').innerHTML = entityA.components.physics.score;
            }
            continue;
        }
        
        this.end_game = true;

        // if (entityA.components.collision.onCollision) {
        //     // entityA.components.collision.onCollision(entityB);
        //     this.end_game = true;

        // }
    }
 
    if(this.end_game){  // if game end

        // console.log('end game');
        this.entities.length = 1;
        entityA.components.physics.status = "still";
        entityA.components.physics.position.x = 0; //reset position
        entityA.components.physics.position.y = 0.5; 

        // console.log(this.entities);
        document.getElementById('result').style.display='block';
        document.getElementById('score_board').style.display = 'none';
        this.storageSystem.store_score();
    }
};


exports.CollisionSystem = CollisionSystem;
},{"./storage_indexdb":14}],11:[function(require,module,exports){
var GraphicsSystem = function(entities) {
    this.entities = entities;
    // Canvas is where we draw
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');
    this.anim = false;
};

GraphicsSystem.prototype.run = function() {
    // Run the render loop
    window.requestAnimationFrame(this.tick.bind(this));
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
    window.requestAnimationFrame(this.tick.bind(this));
    
};

exports.GraphicsSystem = GraphicsSystem;
},{}],12:[function(require,module,exports){
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
    bird.components.physics.velocity.y = 0.5;
};

InputSystem.prototype.onTouch = function() {
    // console.log("touchstart");
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.5;
};

InputSystem.prototype.onGameStart = function() {
    // console.log("start");
    document.getElementById('intro').style.display = 'none';
    var bird = this.entities[0];
    bird.components.physics.score = 0; //reset score
    document.getElementById('score').innerHTML = 0;
    document.getElementById('final_score').innerHTML = 0;
    bird.components.physics.position.x = 0; //reset position
    bird.components.physics.position.y = 0.5; 
    bird.components.physics.velocity.x = 0.02; //reset velocity
    bird.components.physics.velocity.y = 0; 

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

exports.InputSystem = InputSystem;
},{}],13:[function(require,module,exports){
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
},{"./collision":10}],14:[function(require,module,exports){
var StorageSystem = function(entities) {
    this.entities = entities;
};

StorageSystem.prototype.support_indexdb = function() {
  if("indexedDB" in window) {return true;}
  else{return false;}
};

StorageSystem.prototype.store_score = function() {
    var db, updated_scores;
    var self = this;
    var current_score = this.entities[0].components.physics.score;

    if(!this.support_indexdb){return false;}


    var openRequest = indexedDB.open("fss",1);

    openRequest.onupgradeneeded = function(e) {
        // console.log("running onupgradeneeded");
        var thisDB = e.target.result;

        if(!thisDB.objectStoreNames.contains("top_scores")) {
            thisDB.createObjectStore("top_scores");
        }
    }

    openRequest.onsuccess = function(e) {
        // console.log("Success!");
        db = e.target.result;
        var transaction = db.transaction(["top_scores"],"readwrite").objectStore("top_scores");
        var scores_array = transaction.get('scores');

        scores_array.onsuccess = function(e) {
            var result = e.target.result;

            if(result == undefined){ // if not score_array, create one
                var tmp = [current_score];
                var request =  transaction.add(tmp ,'scores');
                request.onsuccess = function(e) {} 
                return;      
            }
           
            var insert_idx = 0;
            for(var i= 0 ; i < result.length; i++){
                if(result[i] >= current_score){
                    insert_idx++;
                }
            }

            result.splice(insert_idx, 0, current_score);
            result.length = 5;
            updated_scores = result;
            transaction.put(result,'scores');
            self.show_scores(updated_scores);
        }
    }
};

StorageSystem.prototype.show_scores = function(score_array) {

    var top_scores= document.getElementById('top_scores');
    top_scores.style.display='block';
    top_scores.innerHTML = '<h3>Top Scores</h3><hr>';

    for(var i= 0; i <score_array.length; i++){
        if(score_array[i]==0) return;
        var text_node = document.createElement("h3");
        text_node.innerHTML = '#' + (i+1) + '.&nbsp;&nbsp;&nbsp;' +score_array[i];
        top_scores.appendChild(text_node);
    }

};



exports.StorageSystem = StorageSystem;
},{}]},{},[9]);
