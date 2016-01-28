var StarGraphicsComponent = function(entity) {
    this.entity = entity;
};

StarGraphicsComponent.prototype.draw = function(context) {

	var position = this.entity.components.physics.position;
    var size = this.entity.components.physics.size;

    var img = document.getElementById("star");
    context.drawImage( img, position.x , position.y , size.x, size.y);
};

exports.StarGraphicsComponent = StarGraphicsComponent;