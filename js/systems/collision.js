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
            if(entityB.components.physics.name == 'pipe' && !entityB.components.physics.pass&& entityB.components.physics.position.x + entityB.components.physics.size.x < entityA.components.physics.position.x){
                entityB.components.physics.pass = true;
                entityA.components.physics.pass_pipe_num += 1;

                if(entityA.components.physics.pass_pipe_num >= 20){
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

        this.entities.length = 1;
        entityA.components.physics.status = "still";
        entityA.components.physics.reset_pipe_num = true; // tell system to reset pipe_num
        entityA.components.physics.position.x = 0; //reset position
        entityA.components.physics.position.y = 0.5; 

        if(entityA.components.physics.pass_pipe_num < 20){
            document.getElementById('result_text').innerHTML='Level Failed';
            document.getElementById('final_score').innerHTML = '';
        }
        else{
            document.getElementById('result_text').innerHTML='Level Complete';
            var lbtn_id = 'l' + entityA.components.physics.level + '_star'; // update stars in intro page
            document.getElementById('final_score').innerHTML = document.getElementById('score').innerHTML;
            var old_text = document.getElementById(lbtn_id).innerHTML; 
            var new_text = document.getElementById('final_score').innerHTML;
            if(new_text.length > old_text.length){ //update when get more stars
                document.getElementById(lbtn_id).innerHTML = new_text; 
            }

            if(entityA.components.physics.level + 1> entityA.components.physics.max_level ){
                entityA.components.physics.max_level = entityA.components.physics.level + 1;
            }
            if(entityA.components.physics.max_level > entityA.components.physics.base + 9){
                entityA.components.physics.base += 9;
                this.storageSystem.inprogress_setup();
            }
            var lbtn_id = 'lbtn_' + entityA.components.physics.max_level ;
            document.getElementById(lbtn_id).className  += ' level_btn_active';
        }

        document.getElementById('result').style.display='block';
        document.getElementById('score_board').style.display = 'none';
        this.storageSystem.store_score();
    }
};


exports.CollisionSystem = CollisionSystem;