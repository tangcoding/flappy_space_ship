
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