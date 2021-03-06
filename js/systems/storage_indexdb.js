var StorageSystem = function(entities) {
    this.entities = entities;
};

StorageSystem.prototype.support_indexdb = function() {
  if("indexedDB" in window) {return true;}
  else{return false;}
};

StorageSystem.prototype.store_score = function() {
    var db, updated_scores;
    var self = this;
    var current_score = this.entities[0].components.physics.score;

    if(!this.support_indexdb){return false;}


    var openRequest = indexedDB.open("fss",1);

    openRequest.onupgradeneeded = function(e) {
        // console.log("running onupgradeneeded");
        var thisDB = e.target.result;

        if(!thisDB.objectStoreNames.contains("top_scores")) {
            thisDB.createObjectStore("top_scores");
        }
    }

    openRequest.onsuccess = function(e) {
        // console.log("Success!");
        db = e.target.result;
        var transaction = db.transaction(["top_scores"],"readwrite").objectStore("top_scores");
        var scores_array = transaction.get('scores');

        scores_array.onsuccess = function(e) {
            var result = e.target.result;

            if(result == undefined){ // if no previous scores, create one
                result = [current_score];
                var request =  transaction.add(result ,'scores');
                request.onsuccess = function(e) {
                    self.show_scores(result);
                }     
                return;
            }

            // if previous scores exist, insert current score
            var insert_idx = 0;
            for(var i= 0 ; i < result.length; i++){
                if(result[i] >= current_score){
                    insert_idx++;
                }
            }
            
            result.splice(insert_idx, 0, current_score);
            result.length = 5;
            transaction.put(result,'scores');
            self.show_scores(result);
        }
    }
};

StorageSystem.prototype.show_scores = function(score_array) {

    var top_scores= document.getElementById('top_scores');
    top_scores.style.display='block';
    top_scores.innerHTML = '<h3>Top Scores</h3><hr>';

    for(var i= 0; i <score_array.length; i++){
        if(score_array[i]==0) return;
        var text_node = document.createElement("h3");
        text_node.innerHTML = '#' + (i+1) + '.&nbsp;&nbsp;&nbsp;' +score_array[i];
        top_scores.appendChild(text_node);
    }

};



exports.StorageSystem = StorageSystem;