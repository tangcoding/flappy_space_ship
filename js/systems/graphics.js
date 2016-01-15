var pipe = require('../entities/pipe');

var GraphicsSystem = function(entities) {
    this.entities = entities;
    // Canvas is where we draw
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');
    this.anim = false;
};

GraphicsSystem.prototype.run = function() {
    // Run the render loop
    // window.requestAnimationFrame(this.tick.bind(this));
    window.setInterval(this.tick.bind(this), 1000 /60);
    window.setInterval(this.add_pipes.bind(this), 2000);
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

GraphicsSystem.prototype.add_pipes = function() {
    if(this.entities[0].components.physics.status == 'move'){
        var random_range = function(min, max){
            return Math.random()* (max-min) + min; 
        };

        var pipe_y = random_range(-0.5, 0); //randomly set the left_bottom cornor of pipe
        var pipe_gap = random_range(0.03, 0.06);
        pipe_gap += 0.85;
        this.entities.push(new pipe.Pipe(pipe_y));
        this.entities.push(new pipe.Pipe(pipe_y + pipe_gap)); // draw a pair of pipes
    }
};


exports.GraphicsSystem = GraphicsSystem;