var CollisionSystem = function(entities) {
    this.entities = entities;
    this.end_game = false;
};

CollisionSystem.prototype.tick = function() {

    this.end_game = false;
    var entityA = this.entities[0];
    if(entityA.components.physics.position.y < 0 || entityA.components.physics.position.y > 1){
        this.end_game = true;
    }


    for (var i=1; i<this.entities.length; i++) {
        if(this.end_game) break;

        var entityB = this.entities[i];
        if (!'collision' in entityA.components) {
            continue;
        }

        if (!entityA.components.collision.collidesWith(entityB)) {
            // add score if passing a pipe
            if(!entityB.components.physics.pass&& entityB.components.physics.position.x + entityB.components.physics.size.x < entityA.components.physics.position.x){
                entityA.components.physics.score += 50;
                entityB.components.physics.pass = true;
                document.getElementById('score').innerHTML = entityA.components.physics.score;
                document.getElementById('final_score').innerHTML = entityA.components.physics.score;
            }
            continue;
        }
        
        this.end_game = true;

        // if (entityA.components.collision.onCollision) {
        //     // entityA.components.collision.onCollision(entityB);
        //     this.end_game = true;

        // }
    }

    if(this.end_game){ 
        // console.log('end game');
        this.entities.length = 1;
        entityA.components.physics.status = "still";
        entityA.components.physics.position.x = 0; //reset position
        entityA.components.physics.position.y = 0.5; 

        // console.log(this.entities);
        document.getElementById('result').style.display='block';
        document.getElementById('score_board').style.display = 'none';
    }
};


exports.CollisionSystem = CollisionSystem;