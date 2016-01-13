var StorageSystem = function(entities) {
    this.entities = entities;
};

StorageSystem.prototype.support_local_storage = function() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
};

StorageSystem.prototype.store_score = function() {

    if(!this.support_local_storage){return false;}

    var current_score = this.entities[0].components.physics.score;
    var tmp_array = [ 0, 0, 0, 0, 0]; //tmp array for top 5 scores

    //copy all top scores to tmp array and find insert index of current score
    var insert_idx = 0;
    for(var i= 0; i <5; i++){
        if(localStorage["flappy_space_ship.score." + i ] != null){
            tmp_array[i] = localStorage["flappy_space_ship.score." + i ];
            if(localStorage["flappy_space_ship.score." + i ] > current_score){
                insert_idx++;
            }
        }
    }

    // insert current score
    if(insert_idx < 5){
        localStorage["flappy_space_ship.score." + insert_idx ] = current_score;
        for(var i = insert_idx+1; i < 5; i++){
            localStorage["flappy_space_ship.score." + i ] = tmp_array[i-1];
        }
    }

};

StorageSystem.prototype.show_scores = function() {

    if(!this.support_local_storage){return false;}

    var top_scores= document.getElementById('top_scores');
    top_scores.style.display='block';
    top_scores.innerHTML = '<h3>Top Scores</h3><hr>';

    for(var i= 0; i <5; i++){
        if(localStorage["flappy_space_ship.score." + i ] != null){
            var text_node = document.createElement("h3");
            text_node.innerHTML = '#' + (i+1) + '.  ' +localStorage["flappy_space_ship.score." + i ];
            top_scores.appendChild(text_node);
        }
    }

};



exports.StorageSystem = StorageSystem;