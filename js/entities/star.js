var graphicsComponent = require("../components/graphics/star");
var physicsComponent = require("../components/physics/star_physics");
var collisionComponent = require("../components/collision/circle");


var Star = function( star_y) {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = star_y ;


    var graphics = new graphicsComponent.StarGraphicsComponent(this);
    var collision = new collisionComponent.CircleCollisionComponent(this, physics.radius);
    
    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };

};

exports.Star = Star;