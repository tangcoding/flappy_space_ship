var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {
	 var position = this.entity.components.physics.position;
     var radius = this.entity.components.physics.radius;
     // console.log("x: "+ position.x + "; y: " + position.y);

	context.save();
    var image = document.getElementById("bird");
    context.drawImage(image, position.x-radius/2, position.y-radius/2, radius, radius);
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;