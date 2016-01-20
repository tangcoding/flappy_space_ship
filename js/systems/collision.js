// var storageSystem = require("./storage_indexdb");
var storageSystem = require("./storage_localstorage");

var CollisionSystem = function(entities) {
    this.entities = entities;
    this.end_game = false;
    this.storageSystem = new storageSystem.StorageSystem(entities);
};

CollisionSystem.prototype.tick = function() {

    this.end_game = false;
    var entityA = this.entities[0];
    if(entityA.components.physics.position.y < 0 || entityA.components.physics.position.y > 1){
        this.end_game = true;
    }

    var del_idx = null;

    for (var i=1; i<this.entities.length; i++) {
        if(this.end_game) break;

        var entityB = this.entities[i];
        if (!'collision' in entityA.components) {
            continue;
        }

        if (!entityA.components.collision.collidesWith(entityB)) {
            // add score if passing a pipe
            if(entityB.components.physics.name == 'pipe' && !entityB.components.physics.pass&& entityB.components.physics.position.x + entityB.components.physics.radius < entityA.components.physics.position.x){
                // entityA.components.physics.score += 50;
                entityB.components.physics.pass = true;
                entityA.components.physics.pass_pipe_num += 1;

                if(entityA.components.physics.pass_pipe_num >= 18){
                    this.end_game = true;
                    break;
                }
            }
            continue;
        }
        else{
            if(entityB.components.physics.name == 'pipe'){ //collide with pipes
                this.end_game = true;
            }
            else if(entityB.components.physics.name == 'star' && !entityB.components.physics.pick){
                entityB.components.physics.pick = true;
                del_idx = i;
                document.getElementById('score').innerHTML += '&star;';
                document.getElementById('final_score').innerHTML  += '&star;';
            }
        }

        // if (entityA.components.collision.onCollision) {
        //     // entityA.components.collision.onCollision(entityB);
        //     this.end_game = true;
        // }
    }
    // delete star that is picked
    if(del_idx != null){
        this.entities.splice(del_idx,1);
    }
 
    if(this.end_game){  // if game end

        // console.log('end game');
        this.entities.length = 1;
        entityA.components.physics.status = "still";
        entityA.components.physics.position.x = 0; //reset position
        entityA.components.physics.position.y = 0.5; 

        var level_id = 'l' + entityA.components.physics.level + '_star'; // update stars in intro page
        document.getElementById(level_id).innerHTML  = document.getElementById('final_score').innerHTML;
        if(entityA.components.physics.pass_pipe_num < 18){
            document.getElementById('result_text').innerHTML='Level Failed';
        }
        else{
            document.getElementById('result_text').innerHTML='Level Complete';
            var lbtn_id = 'lbtn_' + (entityA.components.physics.level +1);
            document.getElementById(lbtn_id).className  += 'level_btn_active';

            entityA.components.physics.level +=1; // level up
        }

        document.getElementById('result').style.display='block';
        document.getElementById('score_board').style.display = 'none';
        // this.storageSystem.store_score();
    }
};


exports.CollisionSystem = CollisionSystem;