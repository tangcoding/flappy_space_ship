var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
    var app = new flappyBird.FlappyBird();
    app.run();
});

// document.getElementById('start').addEventListener('click', function(){
// 	    console.log("start");
// 	    document.getElementById('intro').style.display = 'none';
// 	    app = new flappyBird.FlappyBird();
// 	    app.run();
// });
