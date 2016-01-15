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
    // this.position.y += this.velocity.y * delta;
    // console.log("x: "+ this.position.x + "; y: " + this.position.y);
};

exports.PhysicsComponent = PhysicsComponent;