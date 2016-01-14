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