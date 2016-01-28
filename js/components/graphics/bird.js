var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {
	var position = this.entity.components.physics.position;
    var size = this.entity.components.physics.size;
    // console.log("x: "+ position.x + "; y: " + position.y);

    //change spaceship figure as level changes
    var level = document.getElementById("level").innerHTML;
    level = parseInt(level);
    var img = document.getElementById("bird1");
    if(level%2 == 0){
        img = document.getElementById("bird2");
    }

    context.drawImage(img, position.x, position.y, size.x, size.y);
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;