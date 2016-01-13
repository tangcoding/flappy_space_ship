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