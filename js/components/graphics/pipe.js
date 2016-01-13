var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {

	 var position = this.entity.components.physics.position;
	 var size = this.entity.components.physics.size;

	context.save();
    var img = document.getElementById("rock");
    context.drawImage( img, position.x , position.y , size.x, size.y);
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;