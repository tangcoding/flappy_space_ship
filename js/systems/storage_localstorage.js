var StorageSystem = function(entities) {
    this.entities = entities;
};

StorageSystem.prototype.support_local_storage = function() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (error) {
    return false;
  }
};

StorageSystem.prototype.store_score = function() {

    if(!this.support_local_storage){return false;}

    localStorage["fss.max_level"] = this.entities[0].components.physics.max_level;
    localStorage["fss.base"] = this.entities[0].components.physics.base;

    var star_obj = {};
    if(localStorage["fss.level_star"] != null){
        star_obj = JSON.parse(localStorage["fss.level_star"]);
    }
    var finished_level = this.entities[0].components.physics.level; 
    var text = document.getElementById('final_score').innerHTML;
    if( !star_obj[finished_level] ){
        star_obj[finished_level] = text;
    }
    else{
        if(text.length > star_obj[finished_level].length){ // update when have more stars
            star_obj[finished_level] = text;
        }
    }


    localStorage["fss.level_star"] = JSON.stringify(star_obj);
};

StorageSystem.prototype.onload_setup = function () {
    if(!this.support_local_storage){return false;}

    var max_level = 1;
    if(localStorage["fss.max_level"]!= null){
        max_level = parseInt(localStorage["fss.max_level"]);
    }
    this.entities[0].components.physics.max_level = max_level;

    var base = 0;
    if(localStorage["fss.base"]!= null){
        base = parseInt( localStorage["fss.base"] );
    }
    this.entities[0].components.physics.base = base;   

    var star_obj = {};
    if(localStorage["fss.level_star"] != null){
        star_obj = JSON.parse(localStorage["fss.level_star"]);
    }
    this.show_score(max_level, base, star_obj);
}

StorageSystem.prototype.inprogress_setup = function () {
    if(!this.support_local_storage){return false;}

    var max_level = this.entities[0].components.physics.max_level;
    localStorage["fss.max_level"] = max_level;
    var base = this.entities[0].components.physics.base;
    localStorage["fss.base"] = base;   

    var star_obj = {};
    if(localStorage["fss.level_star"] != null){
        star_obj = JSON.parse(localStorage["fss.level_star"]);
    }

    this.show_score(max_level, base, star_obj);
}


StorageSystem.prototype.show_score = function(max_level, base, star_obj) {

    var level_wrap = document.getElementById('level_wrap');
    level_wrap.innerHTML = '';
    // console.log(star_obj);

    for(var i = 1; i <= 9; i++){
        var level_num = i + base;
        var text_node = document.createElement("button");
        text_node.className += " level_btn";
        text_node.id = "lbtn_" + level_num;

        var star_text = ''; // write star info
        if(star_obj[level_num]){ star_text = star_obj[level_num] };

        text_node.innerHTML = '<p class="ltext">' + level_num + '</p><p class="star_text" id="l' + level_num + '_star">' + star_text + '</p>';
        level_wrap.appendChild(text_node);
    }

    if(max_level > base){ // make the on_going level active
        for( var i = base + 1; i <= max_level; i++){
            var lbtn_id = 'lbtn_' + i;
            document.getElementById(lbtn_id).className  += ' level_btn_active';  
        }   
    }
};

exports.StorageSystem = StorageSystem;