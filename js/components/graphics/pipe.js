var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {

	 var position = this.entity.components.physics.position;
	 // var size = this.entity.components.physics.size;
     var radius = this.entity.components.physics.radius;
	 // console.log(position.y );

	context.save();
    //change rock figure as level changes
    var level = document.getElementById("level").innerHTML;
    level = parseInt(level);
    var img = document.getElementById("rock1");
    if(level%3 == 2){
        img = document.getElementById("rock2");
    }
    else if(level%3 == 0){
        img = document.getElementById("rock3");
    }

    // context.fillStyle = "green";
    // context.beginPath();
    // context.arc( position.x, position.y , radius, 0, 2*Math.PI);
    // context.fill();
    // context.closePath();
    context.drawImage( img, position.x -radius, position.y -radius, 2*radius, 2*radius);
    // context.drawImage( img, position.x , position.y , size.x, size.y);
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;