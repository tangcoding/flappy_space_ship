var StarGraphicsComponent = function(entity) {
    this.entity = entity;
};

StarGraphicsComponent.prototype.draw = function(context) {

	 var position = this.entity.components.physics.position;
     var radius = this.entity.components.physics.radius;

	context.save();
    var img = document.getElementById("star");
    // context.fillStyle = "green";
    // context.beginPath();
    // context.arc( position.x, position.y , radius, 0, 2*Math.PI);
    // context.fill();
    // context.closePath();
    context.drawImage( img, position.x -radius, position.y -radius, 2*radius, 2*radius);
    // context.drawImage( img, position.x , position.y , size.x, size.y);
    context.restore();
};

exports.StarGraphicsComponent = StarGraphicsComponent;