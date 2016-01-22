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