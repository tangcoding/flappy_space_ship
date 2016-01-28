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

StorageSystem.prototype.if_private = function() {
    var storageTestKey = 'test';
    var storage = window.sessionStorage;

    try {
      storage.setItem(storageTestKey, 'test');
      storage.removeItem(storageTestKey);
    } catch (e) {
      if (e.code === DOMException.QUOTA_EXCEEDED_ERR && storage.length === 0) {
        // window.alert('You are in Privacy mode.\nThis game may not function correctly in Privacy mode.')
      } else {
        // window.alert(e);
      }
      return true;
    }
}

StorageSystem.prototype.store_score = function() {

    if(!this.support_local_storage){return false;}

    var star_obj = JSON.parse( this.entities[0].components.physics.star_obj );

    var finished_level = this.entities[0].components.physics.level; 
    var text = document.getElementById('final_score').innerHTML;

    if( !star_obj.hasOwnProperty(finished_level)){
        star_obj[finished_level] = text.length;
    }
    else{
        if(text.length > star_obj[finished_level]){ // update when have more stars
            star_obj[finished_level] = text.length;
        }
    }
    this.entities[0].components.physics.star_obj = JSON.stringify(star_obj);

    var xhr = new XMLHttpRequest(); // send to server
    var path = "/store_gamedata";
    path += '?max_level=' + this.entities[0].components.physics.max_level;
    path += '&star_obj=' + this.entities[0].components.physics.star_obj;
    // var path = "/update_gamedata";
    // path += '?max_level=' + localStorage["fss.max_level"];
    // var update_obj = {};
    // update_obj[finished_level]= star_obj[finished_level];
    // update_obj = JSON.stringify(update_obj);
    // path += '&update_obj=' + update_obj;
    xhr.open('POST', path, true);
    xhr.send();

    if(!this.if_private()){
        localStorage["fss.level_star"] = this.entities[0].components.physics.star_obj;
        localStorage["fss.max_level"] = this.entities[0].components.physics.max_level;
        localStorage["fss.base"] = this.entities[0].components.physics.base;
    }
};

StorageSystem.prototype.onload_setup = function () {
    if(!this.if_private()) {window.alert('This game may not function correctly in Privacy Mode.');}
    if(!this.support_local_storage){return false;}

    var max_level = 1;
    if(document.getElementById("server_max_level").innerHTML != ''){
        max_level = parseInt( document.getElementById("server_max_level").innerHTML );
    }
    else if(localStorage["fss.max_level"]!= null){
        max_level = parseInt(localStorage["fss.max_level"]);
    }
    this.entities[0].components.physics.max_level = max_level;

    var base = max_level - max_level%9;
    if(max_level%9 == 0){
        var tmp = max_level -1;
        base = tmp - tmp%9;
    }
    this.entities[0].components.physics.base = base; 

    var star_obj = {};
    if(document.getElementById("server_star_obj").innerHTML != ''){
        star_obj = JSON.parse(document.getElementById("server_star_obj").innerHTML);
    }
    else if(localStorage["fss.level_star"] != null){
        star_obj = JSON.parse(localStorage["fss.level_star"]);
    }
    this.entities[0].components.physics.star_obj = JSON.stringify(star_obj); 

    this.show_score(max_level, base, star_obj);

    if(!this.if_private()){
        localStorage["fss.max_level"] = max_level;
        localStorage["fss.base"] = base;  
        localStorage["fss.level_star"] = this.entities[0].components.physics.star_obj;
    }
}

StorageSystem.prototype.inprogress_setup = function () {
    if(!this.support_local_storage){return false;}

    var max_level = this.entities[0].components.physics.max_level;
    var base = this.entities[0].components.physics.base;
    var star_obj = JSON.parse(this.entities[0].components.physics.star_obj);
    this.show_score(max_level, base, star_obj);

    if(!this.if_private()){
        localStorage["fss.max_level"] = max_level;
        localStorage["fss.base"] = base; 
    }
}


StorageSystem.prototype.show_score = function(max_level, base, star_obj) {

    var level_wrap = document.getElementById('level_wrap');
    level_wrap.innerHTML = '';

    for(var i = 1; i <= 9; i++){
        var level_num = i + base;
        var text_node = document.createElement("button");
        text_node.className += " level_btn";
        text_node.id = "lbtn_" + level_num;

        var star_text = ''; // write star info
        if(star_obj[level_num]){ 
            for(var j = 0; j < star_obj[level_num]; j++){
                star_text += '&star;'
            }
        };

        text_node.innerHTML = '<p class="ltext">' + level_num + '</p><p class="star_text" id="l' + level_num + '_star">' + star_text + '</p>';

        if(level_num <= max_level){
            text_node.className += " level_btn_active";
        }

        level_wrap.appendChild(text_node);
    }
};

exports.StorageSystem = StorageSystem;