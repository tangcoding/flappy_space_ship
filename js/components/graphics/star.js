var StarGraphicsComponent = function(entity) {
    this.entity = entity;
};

StarGraphicsComponent.prototype.draw = function(context) {

	 var position = this.entity.components.physics.position;
     var size = this.entity.components.physics.size;

	context.save();
    var img = document.getElementById("star");
    context.drawImage( img, position.x , position.y , size.x, size.y);
    context.restore();
};

exports.StarGraphicsComponent = StarGraphicsComponent;