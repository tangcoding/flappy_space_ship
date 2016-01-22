var pipe = require('../entities/pipe');
var star = require('../entities/star');

var GraphicsSystem = function(entities) {
    this.entities = entities;
    // Canvas is where we draw
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');
    this.anim = false;
    this.pipe_num = 0;
};

GraphicsSystem.prototype.run = function() {
    // Run the render loop
    // window.requestAnimationFrame(this.tick.bind(this));
    window.setInterval(this.tick.bind(this), 1000 /60);
    window.setInterval(this.add_pipes_star.bind(this), 2000);
};

GraphicsSystem.prototype.tick = function() {

    // Set the canvas to the correct size if the window is resized
    if (this.canvas.width != this.canvas.offsetWidth ||
        this.canvas.height != this.canvas.offsetHeight) {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }


    // Clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.save();
    
    this.context.translate(this.canvas.width / 2, this.canvas.height);
    this.context.scale(this.canvas.width, -this.canvas.height);

    // Rendering goes here
    var del_idx = [];
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!'graphics' in entity.components) {
            continue;
        }
        var position = entity.components.physics.position; 
        if( position.x < -0.5 ){
            del_idx.push(i); // record entities indexs out of the current view
            continue; // not draw entities out of the current view
        }

        entity.components.graphics.draw(this.context);
    }

    this.context.restore();
    for(var i = del_idx.length-1; i > 0; i--){// remove entities out of the current view
        this.entities.splice(del_idx[i],1);
    }    

    // Continue the render loop
    // window.requestAnimationFrame(this.tick.bind(this));
    
};

GraphicsSystem.prototype.add_pipes_star = function() {
    var level = this.entities[0].components.physics.level%3;
    var reset = this.entities[0].components.physics.reset_pipe_num;

    if(reset){ this.pipe_num = 0; this.entities[0].components.physics.reset_pipe_num = false;}

    if(this.entities[0].components.physics.status == 'move' && this.pipe_num <20){

        var random_range = function(min, max){
            return Math.random()* (max-min) + min; 
        };

        var pipe_y = random_range(0, 0.35 + level*0.03); //randomly set the left_bottom cornor of pipe
        var pipe_size1 = random_range(0.15, 0.22); // random pipe_size
        var pipe_gap = random_range(0.03, 0.06);

        pipe_gap += pipe_size1 + 0.22 +  level*0.02;
        var pipe_size2 = random_range(0.15, 0.22);
        this.entities.push(new pipe.Pipe(pipe_y, pipe_size1));
        this.entities.push(new pipe.Pipe(pipe_y + pipe_gap, pipe_size2)); // draw a pair of pipes

        this.pipe_num += 2;
        // console.log(this.pipe_num);

        if(this.pipe_num%3 == 0){
            var adj = 0.02 +  level*0.01;
            var star_y_min = pipe_y+ pipe_size1 + adj;
            var star_y = random_range(star_y_min, star_y_min + adj); // random star in the gap region
            this.entities.push(new star.Star(star_y));
        }
    }

};


exports.GraphicsSystem = GraphicsSystem;