var PhysicsComponent = function(entity) {
    this.entity = entity;
    this.type = "rect";
    this.status = 'still';
    this.level = 1;
    this.max_level = 1;
    this.pass_pipe_num = 0;
    this.rest_pipe_num = false;
    this.base = 0;
    this.star_obj = null;

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