let canvas = document.getElementById("main");
let ctx = canvas.getContext("2d");
let audio = new Audio("resources/background.mp3");
audio.volume = 0.07
let playing = false;

let mousex;
let mousey;

let logo = {
    x: 800,
    y: 400,
    xspeed: 1,
    yspeed: 1,
    img: new Image()
};

function check_hit_box() {
    if(logo.x + logo.img.width * 0.5 >= canvas.width || logo.x <= 0){
        logo.xspeed *= -1;
    }
        
    if(logo.y + logo.img.height * 0.5 >= canvas.height || logo.y <= 0){
        logo.yspeed *= -1;
    }    
}

function update() {
    setTimeout(() => {
        ctx.fillStyle = '#94d487';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        
        ctx.drawImage(logo.img, logo.x, logo.y, logo.img.width * 0.5, logo.img.height * 0.5);
        

        logo.x += logo.xspeed;
        logo.y += logo.yspeed;
        
        check_hit_box();
        update();   
    })
}

function play_pause() {
    audio.onplaying = function () { playing = true; };
    audio.onpause = function () { playing = false; };

    playing ? audio.pause() : audio.play();
}

(function main() {
    logo.img.src = 'resources/white-192-text.png';

    document.onmousemove = function(event) {
        mousex = event.pageX;
        mousey = event.pageY;
    }

    canvas.addEventListener("click", function() {
        var endx = logo.x + logo.img.width;
        var endy = logo.y + logo.img.height;

        if( (mousex > logo.x && mousey > logo.y) && (mousex < endx && mousey < endy) )
            play_pause();
    });

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    update();
})()
