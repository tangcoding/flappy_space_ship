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